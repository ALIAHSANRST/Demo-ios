import { Canvas, RoundedRect, LinearGradient, vec } from '@shopify/react-native-skia';
import { useState } from 'react';
import { StyleSheet, View, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/theme/mirra';

/**
 * Skia-rendered gradient border — replicates the Figma "Shiny Button Border"
 * component (a rounded-rect stroke filled with a top-left→bottom-right gradient
 * that reads as a glassy rim). Drop it as the LAST child of any relatively-
 * positioned container; it overlays a 1px gradient stroke and ignores touches.
 *
 * The default palette is the subtle white rim used across the MIRRA UI. Pass
 * `colors` for accent rims (e.g. the lime/blue active states).
 */
export function GradientBorder({
  radius,
  strokeWidth = 1,
  colors = ['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'],
  positions,
  diagonal = true,
  style,
}: {
  radius: number;
  strokeWidth?: number;
  colors?: string[];
  positions?: number[];
  /** Gradient direction: diagonal TL→BR (default) or vertical top→bottom. */
  diagonal?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };

  const inset = strokeWidth / 2;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]} onLayout={onLayout}>
      {size.w > 0 && size.h > 0 && (
        <Canvas style={{ width: size.w, height: size.h }}>
          <RoundedRect
            x={inset}
            y={inset}
            width={size.w - strokeWidth}
            height={size.h - strokeWidth}
            r={Math.max(0, radius - inset)}
            style="stroke"
            strokeWidth={strokeWidth}>
            <LinearGradient
              start={vec(0, 0)}
              end={diagonal ? vec(size.w, size.h) : vec(0, size.h)}
              colors={colors}
              positions={positions}
            />
          </RoundedRect>
        </Canvas>
      )}
    </View>
  );
}

/** Accent rim presets matching the Figma active-state borders. */
export const RimColors = {
  glass: ['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'],
  lime: [Colors.lime, 'rgba(225,255,79,0.25)', 'rgba(225,255,79,0.06)'],
  blue: [Colors.verified, 'rgba(38,183,255,0.25)', 'rgba(38,183,255,0.05)'],
} as const;
