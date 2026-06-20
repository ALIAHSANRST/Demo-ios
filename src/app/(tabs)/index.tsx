import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConversationRow } from '@/components/mirra/ConversationRow';
import { GradientBorder } from '@/components/mirra/GradientBorder';
import { Icon } from '@/components/mirra/Icon';
import { Txt } from '@/components/mirra/Txt';
import { conversations } from '@/data/messages-list';
import { Colors, Radius, Space } from '@/theme/mirra';

function Header() {
  return (
    <View style={styles.header}>
      <Txt variant="msgTitle" color={Colors.text80}>
        Messages
      </Txt>
      <View style={styles.headerActions}>
        <Pressable style={styles.sqBtn}>
          <Icon name="magnifyingglass" size={18} color={Colors.text} />
          <GradientBorder radius={Radius.sm} strokeWidth={1} />
        </Pressable>
        <Pressable style={styles.sqBtn}>
          <Icon name="square.and.pencil" size={18} color={Colors.text} />
          <GradientBorder radius={Radius.sm} strokeWidth={1} />
        </Pressable>
      </View>
    </View>
  );
}

function CountBadge({ value, lime }: { value: number; lime?: boolean }) {
  return (
    <View style={[styles.countBadge, lime && { backgroundColor: Colors.lime }]}>
      <Txt variant="microSemi" color={lime ? Colors.bg : Colors.text80}>
        {value}
      </Txt>
    </View>
  );
}

function PrimaryTabs() {
  const [active, setActive] = useState<'primary' | 'requests'>('primary');
  return (
    <View style={styles.bigTabs}>
      <Pressable onPress={() => setActive('primary')} style={[styles.bigTab, active === 'primary' && styles.bigTabOn]}>
        <Icon name="list.bullet" size={18} color={active === 'primary' ? Colors.text : Colors.text50} />
        <Txt variant="metaMedium" color={active === 'primary' ? Colors.text : Colors.text50}>
          Primary
        </Txt>
        <CountBadge value={2} />
      </Pressable>
      <Pressable onPress={() => setActive('requests')} style={[styles.bigTab, active === 'requests' && styles.bigTabOn]}>
        <Txt variant="metaMedium" color={active === 'requests' ? Colors.text : Colors.text50}>
          Requests
        </Txt>
        <CountBadge value={2} />
      </Pressable>
      <GradientBorder radius={Radius.md} strokeWidth={1} />
    </View>
  );
}

function FilterTabs() {
  const [active, setActive] = useState('All');
  const items: { label: string; icon?: Parameters<typeof Icon>[0]['name']; lime?: boolean }[] = [
    { label: 'All', lime: true },
    { label: 'Direct', icon: 'paperplane.fill' },
    { label: 'Digital Persona', icon: 'sparkles' },
  ];
  return (
    <View style={styles.filterRow}>
      <View style={styles.smallTabs}>
        {items.map((it) => {
          const on = active === it.label;
          return (
            <Pressable key={it.label} onPress={() => setActive(it.label)} style={[styles.smallTab, on && styles.smallTabOn]}>
              {it.icon && <Icon name={it.icon} size={14} color={on ? Colors.text : Colors.text50} />}
              <Txt variant="micro" color={on ? Colors.text : Colors.text50}>
                {it.label}
              </Txt>
              <CountBadge value={2} lime={on && it.lime} />
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.filterBtn}>
        <Icon name="line.3.horizontal.decrease" size={16} color={Colors.text} />
      </Pressable>
    </View>
  );
}

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <Header />
      <PrimaryTabs />
      <View style={{ height: Space.m }} />
      <FilterTabs />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Space.s, paddingBottom: insets.bottom + 96, gap: Space.xs }}>
        {conversations.map((c) => (
          <ConversationRow key={c.id} item={c} onPress={() => router.push('/chat')} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Space.l },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 44, marginBottom: Space.l },
  headerActions: { flexDirection: 'row', gap: 6 },
  sqBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigTabs: {
    flexDirection: 'row',
    gap: Space.xs,
    height: 40,
    padding: 4,
    borderRadius: Radius.md,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  bigTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: Radius.xs },
  bigTabOn: { backgroundColor: Colors.glass05, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.borderSoft },

  filterRow: { flexDirection: 'row', alignItems: 'center', gap: Space.s, height: 32 },
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
  smallTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: Radius.xs },
  smallTabOn: { backgroundColor: Colors.glass05, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.borderSoft },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countBadge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: Colors.glass10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
