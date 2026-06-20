import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientBorder } from '@/components/mirra/GradientBorder';
import { Icon } from '@/components/mirra/Icon';
import { NetworkCard } from '@/components/mirra/NetworkCard';
import { Txt } from '@/components/mirra/Txt';
import { networkCards, networkFilters } from '@/data/network';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Icon name="m.circle.fill" size={24} color={Colors.text} />
        <Txt variant="screenTitle" color={Colors.text}>
          MIRRA Network
        </Txt>
        <View style={styles.countPill}>
          <Txt variant="microSemi" color={Colors.text80}>
            120k
          </Txt>
        </View>
      </View>
      <Pressable style={styles.sqBtn}>
        <View style={styles.searchGlow} />
        <Icon name="magnifyingglass" size={18} color={Colors.text} />
        <View style={styles.searchSparkle}>
          <Icon name="sparkle.fill" size={9} color={Colors.text} />
        </View>
        <GradientBorder radius={Radius.lg} strokeWidth={1} />
      </Pressable>
    </View>
  );
}

function ControlRow() {
  const [tab, setTab] = useState<'card' | 'map'>('card');
  return (
    <View style={styles.controlRow}>
      <Pressable style={styles.locInput}>
        <Icon name="mappin.and.ellipse" size={16} color={Colors.text60} />
        <Txt variant="metaMedium" color={Colors.text50} numberOfLines={1} style={{ flex: 1 }}>
          Mission Beach, San Diego
        </Txt>
      </Pressable>
      <Pressable style={styles.filterBtn}>
        <Icon name="line.3.horizontal" size={16} color={Colors.text} />
        <GradientBorder radius={Radius.sm} strokeWidth={1} colors={['#1d4afe', '#56d8ff']} />
      </Pressable>
      <Pressable style={styles.sortBtn}>
        <Icon name="arrow.up.arrow.down" size={16} color={Colors.text80} />
      </Pressable>
      <View style={styles.vDivider} />
      <View style={styles.smallTabs}>
        <Pressable onPress={() => setTab('card')} style={[styles.smallTab, tab === 'card' && styles.smallTabOn]}>
          <Icon name="rectangle.on.rectangle" size={14} color={tab === 'card' ? Colors.text : Colors.text50} />
          <Txt variant="micro" color={tab === 'card' ? Colors.text : Colors.text50}>
            Card
          </Txt>
        </Pressable>
        <Pressable onPress={() => setTab('map')} style={[styles.smallTab, tab === 'map' && styles.smallTabOn]}>
          <Icon name="mappin.and.ellipse" size={14} color={tab === 'map' ? Colors.text : Colors.text50} />
          <Txt variant="micro" color={tab === 'map' ? Colors.text : Colors.text50}>
            Map
          </Txt>
        </Pressable>
      </View>
    </View>
  );
}

function FilterChips() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
      {networkFilters.map((f) => (
        <Pressable key={f.label} style={[styles.filterChip, f.active && styles.filterChipOn]}>
          {f.active && <Icon name="asterisk" size={14} color={Colors.bg} />}
          {f.emoji && <Image source={Img[f.emoji]} style={{ width: 16, height: 16 }} contentFit="contain" />}
          <Txt variant="metaSemi" color={f.active ? Colors.bg : Colors.text80}>
            {f.label}
          </Txt>
          {!f.emoji && <Icon name="asterisk" size={14} color={f.active ? Colors.bg : Colors.text80} />}
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default function NetworkScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <Header />
      <View style={{ height: Space.l }} />
      <ControlRow />
      <View style={{ height: Space.l }} />
      <FilterChips />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Space.l, paddingBottom: insets.bottom + 110, gap: Space.xl }}>
        {networkCards.map((c) => (
          <NetworkCard key={c.id} card={c} onMessage={() => router.push('/chat')} onConnect={() => router.push('/dp-chat')} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Space.l },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 44 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Space.s },
  countPill: {
    minWidth: 44,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sqBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // Blue glow seated at the bottom of the search button (Figma blurred blue ellipse).
  searchGlow: {
    position: 'absolute',
    bottom: -14,
    alignSelf: 'center',
    width: 30,
    height: 22,
    borderRadius: 16,
    backgroundColor: '#1d4afe',
    boxShadow: '0px 0px 12px 2px rgba(29,74,254,0.9)',
  },
  searchSparkle: { position: 'absolute', top: 4, right: 5 },

  controlRow: { flexDirection: 'row', alignItems: 'center', gap: Space.m, height: 32 },
  locInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    maxWidth: 170,
    height: 32,
    paddingLeft: Space.m,
    paddingRight: 2,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  sortBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Active filter button (Figma): #1a1a1a fill, blue gradient border + blue glow.
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 8px rgba(29,74,254,0.55)',
  },
  vDivider: { width: StyleSheet.hairlineWidth, height: 32, backgroundColor: Colors.glass20 },
  smallTabs: {
    flex: 1,
    flexDirection: 'row',
    height: 32,
    padding: 2,
    gap: Space.xs,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  smallTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: Radius.xs },
  smallTabOn: { backgroundColor: Colors.glass05, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.borderSoft },

  chipsRow: { gap: Space.s, alignItems: 'center', paddingRight: Space.l },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingHorizontal: Space.m,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
  },
  filterChipOn: { backgroundColor: Colors.text80, borderColor: 'transparent' },
});
