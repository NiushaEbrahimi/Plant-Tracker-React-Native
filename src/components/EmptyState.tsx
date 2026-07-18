import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🪴</Text>
      <Text style={[type.h2, styles.title]}>No plants yet</Text>
      <Text style={[type.body, styles.subtitle]}>
        Add your first plant and start tracking when it needs water.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { color: colors.textPrimary, marginBottom: 6 },
  subtitle: { color: colors.textSecondary, textAlign: 'center' },
});
