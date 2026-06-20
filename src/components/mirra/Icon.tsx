import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { ColorValue, Platform, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { IconSvg } from './icon-svgs';
import { Colors } from '@/theme/mirra';

/**
 * Icons are the exact vectors exported from the Figma file (see icon-svgs.ts).
 * Line icons use `currentColor`, so the `color` prop tints them; gradient icons
 * (e.g. the blue verified badge) keep their own paint. A small set not present
 * in the export falls back to SF Symbols on iOS / a unicode glyph elsewhere.
 */
const SF_TO_SVG: Record<string, keyof typeof IconSvg> = {
  magnifyingglass: 'search',
  'square.and.pencil': 'compose',
  plus: 'plus',
  'line.3.horizontal.decrease': 'settings',
  'chevron.left': 'arrowleft',
  ellipsis: 'dotsv',
  'chevron.right': 'arrowupright',
  'arrow.up.right': 'arrowupright',
  'mic.fill': 'mic',
  sparkles: 'sparkle',
  'checkmark.seal.fill': 'verified',
  'mappin.and.ellipse': 'gps',
  'person.2.fill': 'users',
  'bubble.left.fill': 'conversations',
  'square.grid.2x2.fill': 'fourSquares',
  'map.fill': 'map',
  'check.double': 'checkdouble',
};

const fallback: Record<string, string> = {
  'paperplane.fill': '➤',
  'arrow.up': '↑',
  'list.bullet': '☰',
  'bell.slash.fill': '🔕',
  'house.fill': '⌂',
  'play.fill': '▶',
  'bookmark.fill': '🔖',
};

export function Icon({
  name,
  size = 20,
  color = Colors.text,
  style,
}: {
  name: SymbolViewProps['name'] | 'check.double';
  size?: number;
  color?: ColorValue;
  style?: SymbolViewProps['style'];
}) {
  const key = SF_TO_SVG[name as string];
  if (key && IconSvg[key]) {
    return <SvgXml xml={IconSvg[key]} width={size} height={size} color={color as string} />;
  }
  if (Platform.OS === 'ios') {
    return <SymbolView name={name as SymbolViewProps['name']} size={size} tintColor={color} style={style} resizeMode="scaleAspectFit" />;
  }
  return <Text style={{ fontSize: size * 0.9, color, lineHeight: size }}>{fallback[name as string] ?? '•'}</Text>;
}
