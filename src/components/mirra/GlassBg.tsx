import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';

/**
 * Frosted-glass backdrop matching the Figma spec:
 *   background: #FFFFFF0D (white 5%) · backdrop-filter: blur(20px)
 * Drop it as the FIRST child of a rounded, `overflow:'hidden'` container; it paints a
 * real backdrop blur (via expo-blur — on Android we opt into `dimezisBlurView`, which
 * renders the blur at runtime without a native rebuild) plus the white-5% tint on top.
 * Pair the container with `borderWidth: 0.5`, white-5% border, and the inset top highlight.
 */
export function GlassBg({ intensity = 24 }: { intensity?: number }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <BlurView
        intensity={intensity}
        tint="dark"
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />
    </View>
  );
}
