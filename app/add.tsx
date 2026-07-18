import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { usePlantStore } from '../src/store/usePlantStore';
import { colors } from '../src/theme/colors';
import { type } from '../src/theme/typography';
import { PlantIcon } from '../src/types/plant';
import { plantIconOptions } from '../src/utils/plantIcons';

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
            <Text
              style={[
                styles.iconChipText,
                icon === opt.value && styles.iconChipTextSelected,
              ]}
            >
              {opt.label}
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
              styles.iconChip,
              interval === days && styles.iconChipSelected,
            ]}
          >
            <Text
              style={[
                styles.iconChipText,
                interval === days && styles.iconChipTextSelected,
              ]}
            >
              {days}d
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Text style={styles.saveButtonText}>Add Plant</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 60 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular',
    color: colors.textPrimary,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  spacedLabel: { marginTop: 20 },
  iconRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  iconChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconChipText: { fontFamily: 'NunitoSans_400Regular', color: colors.textPrimary },
  iconChipTextSelected: { color: colors.textOnPrimary },
  saveButton: {
    marginTop: 36,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonDisabled: { opacity: 0.5 },
  saveButtonText: {
    color: colors.textOnPrimary,
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 16,
  },
});
