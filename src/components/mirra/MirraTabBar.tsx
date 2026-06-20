import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientBorder } from './GradientBorder';
import { GradientFill } from './GradientFill';
import { Icon } from './Icon';
import { Txt } from './Txt';
import { Img } from '@/theme/images';
import { Colors, Radius } from '@/theme/mirra';

// Minimal shape of the expo-router / react-navigation tab bar props we use.
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
};

type TabRoute = 'index' | 'contacts' | 'profile' | 'network';
type Item = {
  key: string;
  icon?: Parameters<typeof Icon>[0]['name'];
  avatar?: boolean;
  route?: TabRoute;
  badge?: string;
};

// The design's 5-item nav (Figma "Main Navbar - v.3"): My MIRRA (avatar) / Contacts /
// Messages / Conversations / Discover. Numbered lime badges; the active item gets a soft glow.
const ITEMS: Item[] = [
  { key: 'mymirra', avatar: true, route: 'profile', badge: '2' },
  { key: 'contacts', icon: 'person.2.fill', route: 'contacts', badge: '2' },
  { key: 'messages', icon: 'paperplane.fill', route: 'index', badge: '12' },
  { key: 'conversations', icon: 'bubble.left.fill', badge: '2' },
  { key: 'discover', icon: 'magnifyingglass', route: 'network' },
];

export function MirraTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index]?.name;

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom }]} pointerEvents="box-none">
      <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 40 : 0} style={styles.bar}>
        {ITEMS.map((it) => {
          const active = it.route === currentRoute;
          return (
            <Pressable key={it.key} style={styles.item} onPress={() => it.route && navigation.navigate(it.route)}>
              <View style={[styles.itemInner, active && styles.itemActive]}>
                {active && (
                  <GradientFill
                    radial
                    colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                    center={{ x: 0.5, y: 0.62 }}
                    radiusScale={0.62}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <View>
                  {it.avatar ? (
                    <Image source={Img.arianaAv} style={styles.avatar} contentFit="cover" />
                  ) : (
                    <Icon name={it.icon!} size={22} color={Colors.text60} />
                  )}
                  {it.badge && (
                    <View style={styles.badge}>
                      <Txt variant="microSemi" color={Colors.bg} style={{ lineHeight: 12 }}>
                        {it.badge}
                      </Txt>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
        {/* Skia "Shiny Button Border" rim */}
        <GradientBorder radius={Radius.card} strokeWidth={1} />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingHorizontal: 16 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: '100%',
    borderRadius: Radius.card,
    paddingHorizontal: 4,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(20,20,20,0.6)' : 'rgba(26,26,26,0.98)',
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    overflow: 'hidden',
  },
  item: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center' },
  itemInner: { width: '100%', height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.xl, overflow: 'hidden' },
  // Active item (Figma): white-2% base + radial white glow + inset top highlight (white-20% @ y1).
  itemActive: { backgroundColor: 'rgba(255,255,255,0.02)', boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.2)' },
  avatar: { width: 24, height: 24, borderRadius: 7, backgroundColor: Colors.glass20 },
  badge: {
    position: 'absolute',
    top: -5,
    right: -9,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.lime,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    boxShadow: '0px 0px 6px rgba(225,255,79,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
