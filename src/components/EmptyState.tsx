import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.emoji} />
      <Text style={[type.h2, styles.title]}>No plants yet</Text>
      <Text style={[type.body, styles.subtitle]}>
        Add your first plant and start tracking when it needs water.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emoji: { width: 150, height: 120 },
  title: { color: colors.textPrimary, marginBottom: 8 },
  subtitle: { color: colors.textSecondary, textAlign: 'center' },
});
