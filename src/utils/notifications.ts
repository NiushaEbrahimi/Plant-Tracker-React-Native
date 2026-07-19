import * as Notifications from 'expo-notifications';
import { Plant } from '../types/plant';

const DAY_MS = 86400000;

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Schedule a local notification for when a plant needs water.
 * If a notification was already scheduled for this plant, cancel it first.
 */
export async function scheduleWaterReminder(plant: Plant): Promise<void> {
  // Cancel any existing reminder for this plant
  await cancelWaterReminder(plant.id);

  const lastWatered = new Date(plant.lastWateredAt).getTime();
  const triggerDate = lastWatered + plant.waterIntervalDays * DAY_MS;
  const now = Date.now();

  // If already overdue, notify immediately
  if (triggerDate <= now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to water! 💧',
        body: `${plant.name} needs water today!`,
        data: { plantId: plant.id },
      },
      trigger: null,
    });
    return;
  }

  const secondsUntilTrigger = Math.floor((triggerDate - now) / 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to water! 💧',
      body: `${plant.name} needs water today!`,
      data: { plantId: plant.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsUntilTrigger,
    },
  });
}

/** Cancel a scheduled notification for a specific plant. */
export async function cancelWaterReminder(plantId: string): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if (n.content.data?.plantId === plantId) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }
}

/** Reschedule reminders for all plants — call on app start. */
export async function rescheduleAllReminders(plants: Plant[]): Promise<void> {
  // Cancel everything first
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Re-schedule for each plant
  for (const plant of plants) {
    await scheduleWaterReminder(plant);
  }
}
