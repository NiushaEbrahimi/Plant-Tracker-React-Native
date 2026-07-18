import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

interface WaterRingProps {
  progress: number; // 0 (just watered) → 1 (due/overdue)
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode; // plant icon/emoji rendered in the center
}

/**
 * A ring that drains from moss green to marigold to terracotta as a plant's
 * watering day approaches. This is the one signature visual the app is
 * built around — every plant card wears one.
 */
export function WaterRing({
  progress,
  size = 64,
  strokeWidth = 5,
  children,
}: WaterRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, progress));
  const dashOffset = circumference * (1 - clamped);

  const ringColor =
    clamped >= 1
      ? colors.waterOverdue
      : clamped >= 0.75
      ? colors.waterSoon
      : colors.waterFresh;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.surfaceMuted}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
