import React, { useCallback } from 'react';
import { Stack } from 'expo-router';
import { useFonts, Fredoka_500Medium, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { colors } from '../src/theme/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: 'Fredoka_600SemiBold' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'My Plants' }} />
        <Stack.Screen
          name="add"
          options={{ title: 'Add Plant', presentation: 'modal' }}
        />
        <Stack.Screen
          name="plant/[id]"
          options={{ title: '', headerBackTitle: 'Plants' }}
        />
      </Stack>
    </View>
  );
}
