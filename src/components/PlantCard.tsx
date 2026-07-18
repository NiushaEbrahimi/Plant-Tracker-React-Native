import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Plant } from '../types/plant';
import { WaterRing } from './WaterRing';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { plantEmoji } from '../utils/plantIcons';
import {
  wateringProgress,
  wateringStatusLabel,
  formatLastWatered,
} from '../utils/dateHelpers';

interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
  onWaterNow: () => void;
}

export function PlantCard({ plant, onPress, onWaterNow }: PlantCardProps) {
  const progress = wateringProgress(plant);
  const overdue = progress >= 1;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <WaterRing progress={progress}>
        <Text style={styles.emoji}>{plantEmoji[plant.icon]}</Text>
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

      <Pressable onPress={onWaterNow} hitSlop={8} style={styles.waterButton}>
        <Text style={styles.waterButtonText}>💧</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  pressed: { opacity: 0.85 },
  emoji: { fontSize: 26 },
  info: { flex: 1, marginLeft: 14, gap: 2 },
  species: { marginBottom: 2 },
  waterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterButtonText: { fontSize: 18 },
});
