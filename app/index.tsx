import BackgroundAbsolte from '@/src/components/BackgroundAbsolute';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { EmptyState } from '../src/components/EmptyState';
import { PixelButton } from '../src/components/Pixel';
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
          <View style={styles.cardWrapper}>
            <PlantCard
              plant={item}
              onPress={() => router.push(`/plant/${item.id}`)}
              onWaterNow={() => waterPlant(item.id)}
            />
          </View>
        )}
      />

      <View style={styles.fabWrap}>
        <PixelButton onPress={() => router.push('/add')} style={styles.fab}>
          <Image source={require('../assets/plus_icon.png')} style={styles.fabIcon} />
        </PixelButton>
      </View>
      <BackgroundAbsolte/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20, paddingBottom: 100 },
  cardWrapper: { marginTop: 6, marginBottom: 6 },
  fabWrap: { position: 'absolute', right: 24, bottom: 32, zIndex:100 },
  fab: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: { width: 30, height: 30 },
});
