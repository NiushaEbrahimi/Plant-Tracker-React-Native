import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const PIXEL_SIZE = 12;
const COLS = 16;
const ROWS = 16;

// Density per row: 0 = empty, 1 = all pixels
// Top rows very sparse, bottom rows dense
const ROW_DENSITY = [
  0.08, 0.1, 0.15, 0.18,
  0.22, 0.3, 0.38, 0.45,
  0.55, 0.65, 0.75, 0.82,
  0.88, 0.93, 0.97, 1.0,
];

const PIXEL_COLORS = [
  colors.primaryLight,  // green
  colors.primaryLight,  // more green (weighted)
  '#dcb768',           // yellow / golden
  '#4a871f',           // brown
];

// Seeded pseudo-random for consistent layout
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type PixelData = {
  id: number;
  visible: boolean;
  color: string;
  holdOn: number;
  holdOff: number;
  initialDelay: number;
};

function generateGrid(): PixelData[][] {
  const rand = seededRandom(42);
  const grid: PixelData[][] = [];
  let id = 0;

  for (let row = 0; row < ROWS; row++) {
    const density = ROW_DENSITY[row];
    const rowPixels: PixelData[] = [];
    for (let col = 0; col < COLS; col++) {
      const colorIndex = Math.floor(rand() * PIXEL_COLORS.length);
      rowPixels.push({
        id: id++,
        visible: rand() < density,
        color: PIXEL_COLORS[colorIndex],
        holdOn: 800 + rand() * 2000,
        holdOff: 600 + rand() * 1500,
        initialDelay: rand() * 3000,
      });
    }
    grid.push(rowPixels);
  }
  return grid;
}

const GRID = generateGrid();

function AnimatedPixel({ visible, color, holdOn, holdOff, initialDelay }: PixelData) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(initialDelay),
        Animated.timing(opacity, { toValue: 1, duration: 1, useNativeDriver: false }),
        Animated.delay(holdOn),
        Animated.timing(opacity, { toValue: 0, duration: 1, useNativeDriver: false }),
        Animated.delay(holdOff),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, visible, holdOn, holdOff, initialDelay]);

  if (!visible) return <View style={styles.invisible} />;

  return (
    <Animated.View
      style={[styles.square, { opacity, backgroundColor: color }]}
    />
  );
}

export default function BackgroundAbsolute() {
  return (
    <View style={styles.container}>
      {GRID.map((rowPixels, r) => {
        const visibleCount = rowPixels.filter((p) => p.visible).length;
        return (
          <View
            key={r}
            style={[
              styles.row,
              visibleCount < COLS && styles.rowSpread,
            ]}
          >
            {rowPixels.map((p) => (
              <AnimatedPixel
                key={p.id}
                visible={p.visible}
                color={p.color}
                holdOn={p.holdOn}
                holdOff={p.holdOff}
                initialDelay={p.initialDelay}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ROWS * PIXEL_SIZE,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    height: PIXEL_SIZE,
  },
  rowSpread: {
    justifyContent: 'space-evenly',
  },
  square: {
    width: PIXEL_SIZE,
    height: PIXEL_SIZE,
    backgroundColor: colors.primaryLight,
    borderWidth: 0.5,
    borderColor: colors.outline,
  },
  invisible: {
    width: PIXEL_SIZE,
    height: PIXEL_SIZE,
  },
});
