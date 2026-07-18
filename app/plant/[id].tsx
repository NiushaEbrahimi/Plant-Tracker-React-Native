import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { WaterRing } from '../../src/components/WaterRing';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme/colors';
import { type } from '../../src/theme/typography';
import {
  formatLastWatered,
  wateringProgress,
  wateringStatusLabel,
} from '../../src/utils/dateHelpers';
import { plantEmoji } from '../../src/utils/plantIcons';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plant = usePlantStore((s) => s.plants.find((p) => p.id === id));
  const waterPlant = usePlantStore((s) => s.waterPlant);
  const removePlant = usePlantStore((s) => s.removePlant);

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

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <WaterRing progress={wateringProgress(plant)} size={120} strokeWidth={8}>
          <Text style={styles.emoji}>{plantEmoji[plant.icon]}</Text>
        </WaterRing>
        <Text style={[type.h1, styles.name]}>{plant.name}</Text>
        <Text style={[type.body, styles.species]}>{plant.species}</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Status" value={wateringStatusLabel(plant)} />
        <Stat label="Last watered" value={formatLastWatered(plant)} />
        <Stat label="Every" value={`${plant.waterIntervalDays} days`} />
      </View>

      <Pressable
        style={styles.waterButton}
        onPress={() => waterPlant(plant.id)}
      >
        <Text style={styles.waterButtonText}>💧 Water now</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Remove plant</Text>
      </Pressable>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[type.caption, styles.statLabel]}>{label}</Text>
      <Text style={[type.h2, styles.statValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  hero: { alignItems: 'center', marginTop: 12, marginBottom: 24 },
  emoji: { fontSize: 46 },
  name: { marginTop: 16 },
  species: { color: colors.textSecondary, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stat: { alignItems: 'center', flex: 1 },
  statLabel: { marginBottom: 4 },
  statValue: { fontSize: 15, textAlign: 'center' },
  waterButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  waterButtonText: {
    color: colors.textOnPrimary,
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 16,
  },
  deleteButton: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
  deleteButtonText: { color: colors.waterOverdue, fontFamily: 'NunitoSans_400Regular' },
});
