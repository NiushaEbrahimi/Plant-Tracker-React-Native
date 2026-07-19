import PlantIcon from '@/src/utils/plantIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PixelButton, PixelPanel } from '../../src/components/Pixel';
import { WaterRing } from '../../src/components/WaterRing';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors, pixel } from '../../src/theme/colors';
import { type } from '../../src/theme/typography';
import {
  daysSinceWatered,
  formatLastWatered,
  wateringProgress,
  wateringStatusLabel,
} from '../../src/utils/dateHelpers';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plant = usePlantStore((s) => s.plants.find((p) => p.id === id));
  const waterPlant = usePlantStore((s) => s.waterPlant);
  const setLastWateredDaysAgo = usePlantStore((s) => s.setLastWateredDaysAgo);
  const removePlant = usePlantStore((s) => s.removePlant);

  const daysAgo = useMemo(
    () => (plant ? daysSinceWatered(plant) : 0),
    [plant?.lastWateredAt]
  );

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={type.body}>This plant no longer exists.</Text>
      </View>
    );
  }

  function confirmDelete() {
    Alert.alert('Remove plant?', `${plant!.name} will be removed from your list.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removePlant(plant!.id);
          router.back();
        },
      },
    ]);
  }

  function adjustDays(delta: number) {
    const next = Math.max(0, daysAgo + delta);
    setLastWateredDaysAgo(plant!.id, next);
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <WaterRing progress={wateringProgress(plant)} size={160} strokeWidth={4}>
          <PlantIcon icon={plant.icon} size={140} />
        </WaterRing>
        <Text style={[type.h1, styles.name]}>{plant.name}</Text>
        <Text style={[type.body, styles.species]}>{plant.species}</Text>
      </View>

      <View>
        <PixelPanel style={styles.statsRow}>
          <Stat label="Status" value={wateringStatusLabel(plant)} />
          <Stat label="Last watered" value={formatLastWatered(plant)} />
          <Stat label="Every" value={`${plant.waterIntervalDays} days`} />
        </PixelPanel>
      </View>

      <View style={styles.daysAgoSection}>
        <Text style={[type.label, styles.daysAgoLabel]}>DAYS AGO</Text>
        <PixelPanel style={styles.daysAgoRow}>
          <Pressable
            onPress={() => adjustDays(-1)}
            disabled={daysAgo <= 0}
            style={({ pressed }) => [
              styles.daysAgoButton,
              pressed && styles.daysAgoButtonPressed,
              daysAgo <= 0 && styles.daysAgoButtonDisabled,
            ]}
          >
            <Text style={styles.daysAgoButtonText}>-</Text>
          </Pressable>

          <View style={styles.daysAgoValueContainer}>
            <Text style={styles.daysAgoValue}>{daysAgo}</Text>
          </View>

          <Pressable
            onPress={() => adjustDays(1)}
            style={({ pressed }) => [
              styles.daysAgoButton,
              pressed && styles.daysAgoButtonPressed,
            ]}
          >
            <Text style={styles.daysAgoButtonText}>+</Text>
          </Pressable>
        </PixelPanel>
      </View>

      <PixelButton onPress={() => waterPlant(plant.id)} style={styles.waterButton}>
        <View style={styles.waterButtonContent}>
          <Image source={require("../../assets/droplet_icon.png")} style={styles.waterButtonIcon} />
          <Text style={styles.waterButtonText}>Water now</Text>
        </View>
      </PixelButton>

      <Pressable style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Remove plant</Text>
      </Pressable>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[type.label, styles.statLabel]}>{label}</Text>
      <Text style={[type.body, styles.statValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  hero: { alignItems: 'center', marginTop: 12, marginBottom: 24 },
  name: { marginTop: 16 },
  species: { color: colors.textSecondary, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  stat: { alignItems: 'center', flex: 1 },
  statLabel: { marginBottom: 8 },
  statValue: { fontSize: 17, textAlign: 'center' },
  daysAgoSection: { marginTop: 16 },
  daysAgoLabel: { marginBottom: 8 },
  daysAgoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 0,
  },
  daysAgoButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.surfaceMuted,
    borderWidth: pixel.borderWidth,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysAgoButtonPressed: { backgroundColor: colors.background },
  daysAgoButtonDisabled: { opacity: 0.4 },
  daysAgoButtonText: {
    fontFamily: 'Silkscreen_700Bold',
    fontSize: 20,
    color: colors.textPrimary,
  },
  daysAgoValueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysAgoValue: {
    fontFamily: 'Silkscreen_700Bold',
    fontSize: 28,
    color: colors.textPrimary,
  },
  waterButton: { paddingVertical: 15, alignItems: 'center', marginTop: 16 },
  waterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  waterButtonIcon: { width: 26, height: 26 },
  waterButtonText: {
    color: colors.textOnPrimary,
    fontFamily: 'Silkscreen_700Bold',
    fontSize: 15,
  },
  deleteButton: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
  deleteButtonText: { color: colors.waterOverdue, fontFamily: 'VT323_400Regular', fontSize: 17 },
});
