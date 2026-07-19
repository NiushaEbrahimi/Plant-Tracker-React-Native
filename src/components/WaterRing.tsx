import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, pixel } from '../theme/colors';

interface WaterRingProps {
  progress: number; // 0 (just watered) → 1 (due/overdue)
  size?: number;
  strokeWidth?: number; // border thickness of the gauge frame
  children?: React.ReactNode; // plant icon/emoji rendered in the center
}

/**
 * A blocky pixel "water gauge" — a square frame that fills from the bottom
 * like a retro health bar, instead of a smooth circular progress ring
 * (curves don't read as pixel art). Color shifts moss green → marigold →
 * terracotta as the plant's watering day approaches.
 */
export function WaterRing({
  progress,
  size = 64,
  strokeWidth = pixel.borderWidth,
  children,
}: WaterRingProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const fillColor =
    clamped >= 1
      ? colors.waterOverdue
      : clamped >= 0.75
      ? colors.waterSoon
      : colors.waterFresh;

  const innerSize = size - strokeWidth * 2;

  return (
    <View
      style={[
        styles.frame,
        {
          width: size,
          height: size,
          borderWidth: strokeWidth,
          borderColor: colors.outline,
        },
      ]}
    >
      {/* Background — always visible */}
      <View style={[styles.empty, { width: innerSize, height: innerSize }]} />
      {/* Fill bar — rises from the bottom */}
      {clamped > 0 && (
        <View
          style={[
            styles.fill,
            {
              width: innerSize,
              height: Math.max(2, innerSize * clamped),
              backgroundColor: fillColor,
            },
          ]}
        />
      )}
      {/* Icon on top */}
      <View style={styles.center}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  empty: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.surfaceMuted,
  },
  fill: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
