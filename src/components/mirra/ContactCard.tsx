import { Image } from 'expo-image';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import { GradientBorder } from './GradientBorder';
import { Icon } from './Icon';
import { Txt } from './Txt';
import { VerifiedBadge } from './VerifiedBadge';
import type { Block, Contact } from '@/data/contacts';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function IconChips({ icons, more }: { icons: string[]; more?: number }) {
  return (
    <View style={styles.chipRow}>
      {icons.map((ic, i) => (
        <View key={i} style={styles.chip}>
          <Txt style={{ fontSize: 18 }}>{ic}</Txt>
        </View>
      ))}
      {more ? (
        <View style={styles.chip}>
          <Txt variant="bodyMedium" color={Colors.text80} style={{ fontFamily: 'Switzer-Semibold' }}>
            +{more}
          </Txt>
        </View>
      ) : null}
    </View>
  );
}

function CommonBlock({ block }: { block: Block }) {
  return (
    <View style={styles.block}>
      <Txt variant="blockLabel" color={Colors.text60}>
        {block.label}
      </Txt>
      {block.kind === 'text' ? (
        <View style={styles.textPill}>
          {block.icon && <Icon name={block.icon as any} size={13} color={Colors.lime} />}
          <Txt variant="metaMedium" color={Colors.text60} numberOfLines={1}>
            {block.value}
          </Txt>
        </View>
      ) : (
        <IconChips icons={block.icons} more={block.more} />
      )}
    </View>
  );
}

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={Img[contact.photo]} style={styles.photo} contentFit="cover" />

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <View style={styles.nameInner}>
              <Txt variant="cardName" color={Colors.text} numberOfLines={1}>
                {contact.name}
              </Txt>
              {contact.verified && <VerifiedBadge size={15} />}
            </View>
            <Pressable hitSlop={8} style={styles.menuBtn}>
              <Icon name="ellipsis" size={16} color={Colors.text60} />
            </Pressable>
          </View>

          <Txt variant="metaMedium" color={Colors.text60} numberOfLines={1}>
            {contact.title}
          </Txt>

          <View style={styles.btnRow}>
            <Pressable style={styles.dmBtn}>
              <Icon name="bubble.left.fill" size={14} color={Colors.text80} />
              <Txt variant="meta" color={Colors.text80}>
                DM
              </Txt>
            </Pressable>
            <Pressable style={styles.chatBtn}>
              <Txt variant="metaSemi" color={Colors.text80}>
                Chat with DP
              </Txt>
            </Pressable>
          </View>

          <Pressable style={styles.visitBtn}>
            <Txt variant="meta" color={Colors.text80}>
              Visit Profile
            </Txt>
          </Pressable>
        </View>
      </View>

      <View style={styles.commonSection}>
        <View style={styles.commonHeader}>
          <Icon name="check.double" size={13} color={Colors.lime} />
          <Txt variant="metaSemi" color={Colors.text80}>
            Things in Common
          </Txt>
          <View style={styles.commonBadge}>
            <Txt variant="microSemi" color={Colors.text80}>
              {contact.inCommon}
            </Txt>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.blocksRow}>
          {contact.blocks.map((b, i) => (
            <CommonBlock key={i} block={b} />
          ))}
        </ScrollView>
      </View>

      <GradientBorder radius={Radius.xxl} strokeWidth={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass05,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    overflow: 'hidden',
  },
  topRow: { flexDirection: 'row', gap: Space.m, padding: 0, paddingRight: Space.l },
  photo: { width: 112, height: 152, borderRadius: Radius.lg, backgroundColor: Colors.surface },
  info: { flex: 1, gap: 6, paddingTop: 13 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nameInner: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  menuBtn: { width: 28, height: 28, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.glass05 },

  btnRow: { flexDirection: 'row', gap: Space.s, marginTop: 4 },
  dmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    paddingHorizontal: Space.l,
    height: 36,
    borderRadius: Radius.sm,
  },
  chatBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.glass05,
    height: 36,
    borderRadius: Radius.xs,
  },
  visitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    height: 36,
    borderRadius: Radius.sm,
    marginTop: 2,
  },

  commonSection: { paddingVertical: Space.m, gap: Space.s },
  commonHeader: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: Space.m },
  commonBadge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: Colors.glass10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blocksRow: { flexDirection: 'row', gap: Space.s, paddingHorizontal: Space.m },
  block: { gap: 4 },
  textPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 40,
    paddingHorizontal: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
  },
  chipRow: { flexDirection: 'row', gap: 4 },
  chip: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
