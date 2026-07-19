import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import PixelPlant from './PixelPlant';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PixelPlant style={styles.icon}/>
      </View>
      <Text style={[type.h1, styles.title]}>No plants yet</Text>
      <Text style={[type.body, styles.subtitle]}>
        Add your first plant and{'\n'}start tracking when it needs water.
      </Text>
      <View style={styles.hint}>
        <Text style={styles.hintText}>Tap the + button below to get started</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 100, paddingHorizontal: 40 },
  iconContainer: {
    width: 140,
    height: 140,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 3,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: { width: 200, height: 200 },
  title: { color: colors.textPrimary, marginBottom: 8 },
  subtitle: { color: colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  hint: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.outline,
  },
  hintText: {
    fontFamily: 'VT323_400Regular',
    fontSize: 16,
    color: colors.textSecondary,
  },
});
