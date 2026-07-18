import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, pixel } from '../theme/colors';
import { type } from '../theme/typography';
import { Plant } from '../types/plant';
import {
  formatLastWatered,
  wateringProgress,
  wateringStatusLabel,
} from '../utils/dateHelpers';
import PlantIcon from '../utils/plantIcons';
import { PixelPanel } from './Pixel';
import { WaterRing } from './WaterRing';

interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
  onWaterNow: () => void;
}

export function PlantCard({ plant, onPress, onWaterNow }: PlantCardProps) {
  const progress = wateringProgress(plant);
  const overdue = progress >= 1;

  return (
    <Pressable onPress={onPress}>
      <PixelPanel style={styles.card}>
        <WaterRing progress={progress}>
          <PlantIcon icon={plant.name}/>
        </WaterRing>

        <View style={styles.info}>
          <Text style={type.h2}>{plant.name}</Text>
          <Text style={[type.caption, styles.species]}>{plant.species}</Text>
          <Text
            style={[
              type.label,
              { color: overdue ? colors.waterOverdue : colors.textSecondary },
            ]}
          >
            {wateringStatusLabel(plant)} · {formatLastWatered(plant)}
          </Text>
        </View>

        <Pressable
          onPress={onWaterNow}
          hitSlop={8}
          style={({ pressed }) => [
            styles.waterButton,
            pressed && styles.waterButtonPressed,
          ]}
        >
          <Text style={styles.waterButtonText}>💧</Text>
        </Pressable>
      </PixelPanel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 6,
  },
  emoji: { fontSize: 24 },
  info: { flex: 1, marginLeft: 14, gap: 2 },
  species: { marginBottom: 2 },
  waterButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.surfaceMuted,
    borderWidth: pixel.borderWidth,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterButtonPressed: { backgroundColor: colors.background },
  waterButtonText: { fontSize: 16 },
});
