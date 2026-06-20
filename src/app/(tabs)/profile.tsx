import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/mirra/Avatar';
import { GradientBorder } from '@/components/mirra/GradientBorder';
import { GradientFill } from '@/components/mirra/GradientFill';
import { Icon } from '@/components/mirra/Icon';
import { Txt } from '@/components/mirra/Txt';
import { VerifiedBadge } from '@/components/mirra/VerifiedBadge';
import { dpConversations, profile, profileStats } from '@/data/profile';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function ActionBar({ onTrain }: { onTrain: () => void }) {
  return (
    <View style={styles.actionBar}>
      <Pressable style={[styles.pillBtn, { flex: 1 }]} onPress={onTrain}>
        <Icon name="sparkle.fill" size={18} color={Colors.text} />
        <Txt variant="btn" color={Colors.text80}>
          Train AI Chat
        </Txt>
      </Pressable>
      <Pressable style={styles.pillBtn}>
        <Icon name="pencil" size={18} color={Colors.text} />
        <Txt variant="btn" color={Colors.text80}>
          Edit
        </Txt>
      </Pressable>
      <Pressable style={styles.iconBtn}>
        <Icon name="slider.horizontal.3" size={18} color={Colors.text} />
      </Pressable>
      <View>
        <Pressable style={styles.iconBtn}>
          <Icon name="bell.fill" size={18} color={Colors.text80} />
        </Pressable>
        <View style={styles.bellBadge}>
          <Txt variant="microSemi" color={Colors.bg}>
            2
          </Txt>
        </View>
      </View>
      <Pressable style={styles.iconBtn}>
        <Icon name="line.3.vertical" size={18} color={Colors.text} />
      </Pressable>
    </View>
  );
}

function StatCard({ value, label, delta }: { value: string; label: string; delta?: string }) {
  return (
    <View style={styles.statCard}>
      <Txt variant="statNum" color={Colors.text}>
        {value}
      </Txt>
      <View style={{ gap: 0 }}>
        <Txt variant="metaSemi" color={Colors.text80}>
          {label}
        </Txt>
        <View style={styles.deltaRow}>
          <Txt variant="micro" color={Colors.text40}>
            Last 7 days
          </Txt>
          {delta && (
            <Txt variant="micro" color={Colors.lime}>
              {delta}
            </Txt>
          )}
        </View>
      </View>
    </View>
  );
}

function ProfileCard() {
  return (
    <View style={styles.card}>
      <Image source={Img[profile.photo]} style={StyleSheet.absoluteFill} contentFit="cover" />
      <GradientFill colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']} style={styles.topGrad} />
      <GradientFill colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']} style={styles.btmGrad} />

      {/* Insights */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.insights}>
        {profileStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </ScrollView>

      {/* Bottom info */}
      <View style={styles.cardBottom}>
        <View style={styles.locRow}>
          <View style={styles.locBadge}>
            <View style={styles.pulse}>
              <View style={styles.pulseOuter} />
              <View style={styles.pulseInner} />
            </View>
            <Icon name="location.north.fill" size={16} color={Colors.text80} />
            <Txt variant="loc" color={Colors.text80} numberOfLines={1}>
              {profile.location}
            </Txt>
            <GradientBorder radius={Radius.md} strokeWidth={0.5} />
          </View>
          <Pressable style={styles.locSettings}>
            <Icon name="slider.horizontal.3" size={14} color={Colors.text80} />
            <GradientBorder radius={Radius.md} strokeWidth={0.5} />
          </Pressable>
        </View>

        <View style={styles.contactBar}>
          <Avatar source={Img.arianaAv} size={32} />
          <View style={{ flex: 1, gap: 2, paddingLeft: 4 }}>
            <View style={styles.nameRow}>
              <Txt variant="cardName" color={Colors.text} numberOfLines={1}>
                {profile.name}
              </Txt>
              <VerifiedBadge size={14} />
            </View>
            <Txt variant="metaMedium" color={Colors.text60}>
              {profile.role}
            </Txt>
          </View>
          <View style={styles.statsBar}>
            <View>
              <Txt variant="sender" color={Colors.text}>
                {profile.followers}
              </Txt>
              <Txt variant="statLabel" color={Colors.text80}>
                Followers
              </Txt>
            </View>
            <Image source={Img.logoInstagram} style={{ width: 16, height: 16 }} contentFit="contain" />
          </View>
        </View>

        <View style={styles.bottomActions}>
          {([
            { label: 'View Profile', icon: 'eye' },
            { label: 'All Cards', icon: 'rectangle.on.rectangle' },
            { label: 'Share', icon: 'square.and.arrow.up' },
          ] as const).map((b) => (
            <Pressable key={b.label} style={styles.actionBtn}>
              <Icon name={b.icon} size={16} color={Colors.text80} />
              <Txt variant="btn" color={Colors.text80}>
                {b.label}
              </Txt>
            </Pressable>
          ))}
        </View>
      </View>

      <GradientBorder radius={Radius.card} strokeWidth={1} />
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 84, gap: Space.xl }}>
        <ActionBar onTrain={() => router.push('/dp-chat')} />
        <ProfileCard />

        {/* DP Conversations */}
        <View style={{ gap: Space.m }}>
          <View style={styles.dpHeader}>
            <View style={styles.dpTitleRow}>
              <Txt variant="btn" color={Colors.text40}>
                DP Conversations
              </Txt>
              <Txt variant="btn" color={Colors.text80}>
                {dpConversations.count}
              </Txt>
            </View>
            <Pressable style={styles.seeAll}>
              <Txt variant="metaMedium" color={Colors.text50}>
                See all
              </Txt>
              <Icon name="chevron.right" size={14} color={Colors.text50} />
            </Pressable>
          </View>
          {dpConversations.items.map((q) => (
            <Pressable key={q.id} style={styles.qRow} onPress={() => router.push('/dp-chat')}>
              <View style={styles.qDot} />
              <Txt variant="bodyMedium" color={Colors.text80} numberOfLines={1} style={{ flex: 1 }}>
                {q.kicker}{' '}
                <Txt variant="metaMedium" color={Colors.text60}>
                  {q.text}
                </Txt>
              </Txt>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Space.l },

  actionBar: { flexDirection: 'row', alignItems: 'center', gap: Space.s, height: 44 },
  // Secondary button (Figma): glass05 fill, flat 0.5px white-5% border, subtle inset top highlight.
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.s,
    height: 44,
    paddingHorizontal: Space.l,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: 0.5,
    borderColor: Colors.glass05,
    boxShadow: 'inset 0px 0.5px 0px rgba(255,255,255,0.1)',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: 0.5,
    borderColor: Colors.glass05,
    boxShadow: 'inset 0px 0.5px 0px rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: Radius.lg,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    height: 626,
    borderRadius: Radius.card,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    padding: Space.m,
    justifyContent: 'space-between',
  },
  topGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },
  btmGrad: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 240 },

  insights: { gap: Space.xs },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.s,
    height: 44,
    paddingHorizontal: Space.m,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass07,
  },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: Space.xs },

  cardBottom: { gap: Space.xs },
  locRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Space.xs },
  locBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.xs,
    height: 32,
    paddingLeft: Space.s,
    paddingRight: Space.m,
    borderRadius: Radius.md,
    backgroundColor: Colors.glass10,
  },
  pulse: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  pulseOuter: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.lime, opacity: 0.2 },
  pulseInner: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.lime },
  locSettings: { width: 32, height: 32, borderRadius: Radius.md, backgroundColor: Colors.glass10, alignItems: 'center', justifyContent: 'center' },

  contactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.s,
    minHeight: 58,
    paddingVertical: 10,
    paddingHorizontal: Space.m,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.glass07,
    overflow: 'hidden',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Space.xs },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.s,
    height: 38,
    paddingLeft: Space.l,
    paddingRight: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
  },

  bottomActions: { flexDirection: 'row', gap: Space.xs },
  // Bottom-action button (Figma "Button — BlurButton+Outline"): glass05 fill, 0.5px white-5%
  // inside border, r12, gap 8, padding 13/16, + inner-shadow top highlight (white-10% @ y0.5).
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    gap: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.glass05,
    borderWidth: 0.5,
    borderColor: Colors.glass05,
    boxShadow: 'inset 0px 0.5px 0px rgba(255,255,255,0.1)',
  },

  dpHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dpTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Space.s },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  qRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.s,
    height: 40,
    paddingHorizontal: Space.m,
    borderRadius: Radius.md,
    backgroundColor: Colors.glass07,
  },
  qDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.lime, boxShadow: '0px 0px 6px rgba(225,255,79,0.8)' },
});
