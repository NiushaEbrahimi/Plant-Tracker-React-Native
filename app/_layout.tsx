import { Silkscreen_400Regular, Silkscreen_700Bold, useFonts as useSilkscreen } from '@expo-google-fonts/silkscreen';
import { useFonts as useVT323, VT323_400Regular } from '@expo-google-fonts/vt323';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { colors } from '../src/theme/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [silkscreenLoaded] = useSilkscreen({ Silkscreen_400Regular, Silkscreen_700Bold });
  const [vt323Loaded] = useVT323({ VT323_400Regular });
  const fontsLoaded = silkscreenLoaded && vt323Loaded;

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
          headerTitleStyle: { fontFamily: 'Silkscreen_700Bold', fontSize: 30 },
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
