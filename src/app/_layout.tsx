import { useFonts } from 'expo-font';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { Colors, Font } from '@/theme/mirra';

SplashScreen.preventAutoHideAsync().catch(() => {});

// A dark navigation theme so the pure-black MIRRA background shows through everywhere.
const MirraNavTheme = {
  dark: true,
  colors: {
    primary: Colors.lime,
    background: Colors.bg,
    card: Colors.bg,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.red,
  },
  fonts: {
    regular: { fontFamily: Font.regular, fontWeight: '400' as const },
    medium: { fontFamily: Font.medium, fontWeight: '500' as const },
    bold: { fontFamily: Font.semibold, fontWeight: '600' as const },
    heavy: { fontFamily: Font.semibold, fontWeight: '700' as const },
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    'Switzer-Regular': require('@/assets/fonts/Switzer-Regular.ttf'),
    'Switzer-Medium': require('@/assets/fonts/Switzer-Medium.ttf'),
    'Switzer-Semibold': require('@/assets/fonts/Switzer-Semibold.ttf'),
    'Switzer-Bold': require('@/assets/fonts/Switzer-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {});
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={MirraNavTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" options={{ presentation: 'card', animation: 'slide_from_right' }} />
        <Stack.Screen name="dp-chat" options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
      </Stack>
    </ThemeProvider>
  );
}
