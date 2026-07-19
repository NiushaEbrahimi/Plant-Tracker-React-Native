import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PixelButton } from '../src/components/Pixel';
import { usePlantStore } from '../src/store/usePlantStore';
import { colors, pixel } from '../src/theme/colors';
import { type } from '../src/theme/typography';
import { PlantIcon } from '../src/types/plant';
import PlantIcons, { plantIconOptions } from '../src/utils/plantIcons';

const INTERVAL_PRESETS = [3, 5, 7, 10, 14];

export default function AddPlantScreen() {
  const addPlant = usePlantStore((s) => s.addPlant);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [icon, setIcon] = useState<PlantIcon>('monstera');
  const [interval, setInterval] = useState(7);

  const canSave = name.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    addPlant({
      name: name.trim(),
      species: species.trim() || 'Houseplant',
      icon,
      waterIntervalDays: interval,
    });
    router.back();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={type.label}>NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Monty"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <Text style={[type.label, styles.spacedLabel]}>SPECIES (OPTIONAL)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Monstera Deliciosa"
        placeholderTextColor={colors.textSecondary}
        value={species}
        onChangeText={setSpecies}
      />

      <Text style={[type.label, styles.spacedLabel]}>ICON</Text>
      <View style={styles.iconRow}>
        {plantIconOptions.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => setIcon(opt.value)}
            style={[
              styles.iconChip,
              icon === opt.value && styles.iconChipSelected,
            ]}
          >
            <PlantIcons icon={opt.value} />
            <Text
              style={[
                styles.iconChipLabel,
                icon === opt.value && styles.iconChipLabelSelected,
              ]}
            >
              {opt.value}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[type.label, styles.spacedLabel]}>WATER EVERY</Text>
      <View style={styles.iconRow}>
        {INTERVAL_PRESETS.map((days) => (
          <Pressable
            key={days}
            onPress={() => setInterval(days)}
            style={[
              styles.chip,
              interval === days && styles.chipSelected,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                interval === days && styles.chipTextSelected,
              ]}
            >
              {days}d
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.saveButtonContainer}>
        <PixelButton
          onPress={handleSave}
          disabled={!canSave}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Add Plant</Text>
        </PixelButton>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 60 },
  input: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 19,
    fontFamily: 'VT323_400Regular',
    color: colors.textPrimary,
    marginTop: 8,
    borderWidth: pixel.borderWidth,
    borderColor: colors.outline,
  },
  spacedLabel: { marginTop: 20 },
  iconRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10, marginBottom: 5 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderWidth: pixel.borderWidth,
    borderColor: colors.outline,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  iconChip: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderWidth: pixel.borderWidth,
    borderColor: colors.outline,
    minWidth: 68,
  },
  iconChipSelected: {
    backgroundColor: colors.primary,
  },
  iconChipLabel: {
    fontFamily: 'VT323_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  iconChipLabelSelected: {
    color: colors.textOnPrimary,
  },
  chipText: { fontFamily: 'VT323_400Regular', fontSize: 17, color: colors.textPrimary },
  chipTextSelected: { color: colors.textOnPrimary },
  saveButtonContainer: {
    marginTop: 16,
  },
  saveButton: {
    marginTop: 2,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.textOnPrimary,
    fontFamily: 'Silkscreen_700Bold',
    fontSize: 15,
  },
});
