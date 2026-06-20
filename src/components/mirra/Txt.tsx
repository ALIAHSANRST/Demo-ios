import { Text, TextProps, StyleSheet } from 'react-native';

import { Colors, Type } from '@/theme/mirra';

type Variant = keyof typeof Type;

export function Txt({
  variant = 'body',
  color = Colors.text,
  style,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  return <Text {...rest} style={[Type[variant], { color }, style]} allowFontScaling={false} />;
}

export const txtStyles = StyleSheet.create({});
