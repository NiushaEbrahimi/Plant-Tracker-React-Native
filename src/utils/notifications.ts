import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Plant } from '../types/plant';

const DAY_MS = 86400000;
const isWeb = Platform.OS === 'web';

// Configure how notifications appear when app is in foreground.
// Not supported on web, so skip it there.
if (!isWeb) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestPermissions(): Promise<boolean> {
  if (isWeb) return false;

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Schedule a local notification for when a plant needs water.
 * If a notification was already scheduled for this plant, cancel it first.
 * No-op on web.
 */
export async function scheduleWaterReminder(plant: Plant): Promise<void> {
  if (isWeb) return;

  await cancelWaterReminder(plant.id);

  const lastWatered = new Date(plant.lastWateredAt).getTime();
  const triggerDate = lastWatered + plant.waterIntervalDays * DAY_MS;
  const now = Date.now();

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

/** Cancel a scheduled notification for a specific plant. No-op on web. */
export async function cancelWaterReminder(plantId: string): Promise<void> {
  if (isWeb) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if (n.content.data?.plantId === plantId) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }
}

/** Reschedule reminders for all plants — call on app start. No-op on web. */
export async function rescheduleAllReminders(plants: Plant[]): Promise<void> {
  if (isWeb) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const plant of plants) {
    await scheduleWaterReminder(plant);
  }
}