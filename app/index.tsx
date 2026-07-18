import { router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../src/components/EmptyState';
import { PlantCard } from '../src/components/PlantCard';
import { usePlantStore } from '../src/store/usePlantStore';
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
            onPress={() => router.push({
              pathname: '/plant/[id]',
              params: { id: item.id }
            })}
            onWaterNow={() => waterPlant(item.id)}
          />
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push('/add')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20, paddingBottom: 100 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  fabText: { color: colors.textOnPrimary, fontSize: 28, marginTop: -2 },
});
