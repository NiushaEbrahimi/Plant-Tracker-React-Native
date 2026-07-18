import PlantIcon from '@/src/utils/plantIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PixelButton, PixelPanel } from '../../src/components/Pixel';
import { WaterRing } from '../../src/components/WaterRing';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme/colors';
import { type } from '../../src/theme/typography';
import {
  formatLastWatered,
  wateringProgress,
  wateringStatusLabel,
} from '../../src/utils/dateHelpers';

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
        <WaterRing progress={wateringProgress(plant)} size={120} strokeWidth={4}>
          <PlantIcon icon={plant.icon}/>
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

      <PixelButton onPress={() => waterPlant(plant.id)} style={styles.waterButton}>
        <Text style={styles.waterButtonText}><Image source={require("../../assets/droplet_icon.png")} style={{width:26,height:26}}/> Water now</Text>
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
  emoji: { fontSize: 40 },
  name: { marginTop: 16 },
  species: { color: colors.textSecondary, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  stat: { alignItems: 'center', flex: 1 },
  statLabel: { marginBottom: 6 },
  statValue: { fontSize: 17, textAlign: 'center' },
  waterButton: { paddingVertical: 15, alignItems: 'center', marginTop: 6 },
  waterButtonText: {
    color: colors.textOnPrimary,
    fontFamily: 'Silkscreen_700Bold',
    fontSize: 15,
  },
  deleteButton: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
  deleteButtonText: { color: colors.waterOverdue, fontFamily: 'VT323_400Regular', fontSize: 17 },
});
