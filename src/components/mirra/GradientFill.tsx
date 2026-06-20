import { Canvas, Rect, LinearGradient, RadialGradient, vec } from '@shopify/react-native-skia';
import { useState } from 'react';
import { StyleSheet, View, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

/**
 * Skia-rendered gradient fill (linear or radial). Replaces expo-linear-gradient so we
 * don't need a native rebuild (Skia is already linked via GradientBorder). Drop it as
 * an absolutely-positioned child; it measures itself and paints a gradient rect. For
 * radial, wrap the parent with borderRadius + overflow:'hidden' to clip the glow.
 */
export function GradientFill({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  positions,
  radial,
  center = { x: 0.5, y: 0.55 },
  radiusScale = 0.6,
  style,
}: {
  colors: string[];
  /** Fractional start/end points (0..1 of the box). Default = top→bottom. */
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  positions?: number[];
  /** Render a radial gradient instead of linear. */
  radial?: boolean;
  /** Radial center (0..1 of the box). */
  center?: { x: number; y: number };
  /** Radial radius as a fraction of box width. */
  radiusScale?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };
  return (
    <View pointerEvents="none" style={style} onLayout={onLayout}>
      {size.w > 0 && size.h > 0 && (
        <Canvas style={{ width: size.w, height: size.h }}>
          <Rect x={0} y={0} width={size.w} height={size.h}>
            {radial ? (
              <RadialGradient
                c={vec(center.x * size.w, center.y * size.h)}
                r={size.w * radiusScale}
                colors={colors}
                positions={positions}
              />
            ) : (
              <LinearGradient
                start={vec(start.x * size.w, start.y * size.h)}
                end={vec(end.x * size.w, end.y * size.h)}
                colors={colors}
                positions={positions}
              />
            )}
          </Rect>
        </Canvas>
      )}
    </View>
  );
}
