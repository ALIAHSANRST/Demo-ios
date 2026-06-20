import { Image } from 'expo-image';
import { ImageSourcePropType, View } from 'react-native';

import { Colors } from '@/theme/mirra';

export function Avatar({
  source,
  size = 36,
  ring,
  radius,
}: {
  source: ImageSourcePropType;
  size?: number;
  ring?: string;
  /** Corner radius; defaults to a circle (size/2). Pass a number for a rounded square. */
  radius?: number;
}) {
  const r = radius ?? size / 2;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: r,
        borderWidth: ring ? 1.5 : 0,
        borderColor: ring ?? 'transparent',
        backgroundColor: Colors.surface,
      }}>
      <Image source={source} style={{ width: '100%', height: '100%', borderRadius: r }} contentFit="cover" />
    </View>
  );
}
