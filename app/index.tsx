import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { usePlantStore } from '../src/store/usePlantStore';
import { PlantCard } from '../src/components/PlantCard';
import { EmptyState } from '../src/components/EmptyState';
import { PixelButton } from '../src/components/Pixel';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  const plants = usePlantStore((s) => s.plants);
  const waterPlant = usePlantStore((s) => s.waterPlant);

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => router.push(`/plant/${item.id}`)}
            onWaterNow={() => waterPlant(item.id)}
          />
        )}
      />

      <View style={styles.fabWrap}>
        <PixelButton onPress={() => router.push('/add')} style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </PixelButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20, paddingBottom: 100 },
  fabWrap: { position: 'absolute', right: 24, bottom: 32 },
  fab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: colors.textOnPrimary, fontSize: 28, marginTop: -2 },
});
