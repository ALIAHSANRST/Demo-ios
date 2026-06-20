import { BlurView } from 'expo-blur';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientBorder } from './GradientBorder';
import { Icon } from './Icon';
import { Colors, Radius } from '@/theme/mirra';

// Minimal shape of the expo-router / react-navigation tab bar props we use.
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
};

type Item = {
  key: string;
  icon: Parameters<typeof Icon>[0]['name'];
  route?: 'index' | 'contacts';
  badge?: boolean;
};

// The design's 5-item nav. Messages + Contacts route; the others are visual only.
const ITEMS: Item[] = [
  { key: 'mymirra', icon: 'house.fill', badge: true },
  { key: 'contacts', icon: 'person.2.fill', route: 'contacts', badge: true },
  { key: 'messages', icon: 'paperplane.fill', route: 'index', badge: true },
  { key: 'conversations', icon: 'bubble.left.fill', badge: true },
  { key: 'discover', icon: 'magnifyingglass' },
];

export function MirraTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index]?.name; // 'index' | 'contacts'

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom }]} pointerEvents="box-none">
      <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 40 : 0} style={styles.bar}>
        {ITEMS.map((it) => {
          const active = it.route === currentRoute;
          return (
            <Pressable
              key={it.key}
              style={[styles.item, active && styles.itemActive]}
              onPress={() => it.route && navigation.navigate(it.route)}>
              <View>
                <Icon name={it.icon} size={22} color={active ? Colors.lime : Colors.text60} />
                {it.badge && <View style={styles.badge} />}
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
  item: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.xl },
  itemActive: { backgroundColor: Colors.glass07 },
  badge: {
    position: 'absolute',
    top: -3,
    right: -6,
    minWidth: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lime,
  },
});
