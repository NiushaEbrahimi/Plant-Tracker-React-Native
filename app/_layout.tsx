import { Silkscreen_400Regular, Silkscreen_700Bold, useFonts as useSilkscreen } from '@expo-google-fonts/silkscreen';
import { useFonts as useVT323, VT323_400Regular } from '@expo-google-fonts/vt323';

import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { usePlantStore } from '../src/store/usePlantStore';
import { colors } from '../src/theme/colors';
import { requestPermissions, rescheduleAllReminders } from '../src/utils/notifications';

SplashScreen.preventAutoHideAsync();

const isWeb = Platform.OS === 'web';

function handleBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

export default function RootLayout() {
  const [silkscreenLoaded] = useSilkscreen({ Silkscreen_400Regular, Silkscreen_700Bold });
  const [vt323Loaded] = useVT323({ VT323_400Regular });
  const fontsLoaded = silkscreenLoaded && vt323Loaded;
  const plants = usePlantStore((s) => s.plants);

  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      if (granted) {
        await rescheduleAllReminders(plants);
      }
    })();
  }, [plants]);

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
          options={{
            title: 'Add Plant',
            presentation: isWeb ? 'card' : 'modal',
            ...(isWeb
              ? {
                  headerLeft: () => (
                    <Pressable onPress={handleBack}>
                      <Text style={{ fontFamily: 'Silkscreen_400Regular', fontSize: 16, color: colors.primary, paddingHorizontal: 6 }}>
                        {'< Back'}
                      </Text>
                    </Pressable>
                  ),
                }
              : {}),
          }}
        />
        <Stack.Screen
          name="plant/[id]"
          options={{
            title: '',
            headerLeft: () => (
              <Pressable onPress={handleBack}>
                <Text style={{ fontFamily: 'Silkscreen_400Regular', fontSize: 16, color: colors.primary, paddingHorizontal: 6 }}>
                  {'< Plants'}
                </Text>
              </Pressable>
            ),
          }}
        />
      </Stack>
    </View>
  );
}
