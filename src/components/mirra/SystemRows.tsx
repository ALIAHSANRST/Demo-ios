import { View, StyleSheet, Pressable } from 'react-native';

import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { Txt } from './Txt';
import { VerifiedBadge } from './VerifiedBadge';
import type { ChatItem, Span } from '@/data/messages';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

export function Divider({ item }: { item: Extract<ChatItem, { kind: 'divider' }> }) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.line} />
      <View style={styles.newPill}>
        <Txt variant="microSemi" color={Colors.bg}>
          {item.label}
        </Txt>
      </View>
      <View style={styles.line} />
      {item.right && (
        <Txt variant="metaMedium" color={Colors.text40} style={{ position: 'absolute', right: 0 }}>
          {item.right}
        </Txt>
      )}
    </View>
  );
}

export function InviteCard({ item }: { item: Extract<ChatItem, { kind: 'invite' }> }) {
  return (
    <View style={styles.invite}>
      <Avatar source={Img[item.avatar]} size={28} />
      <View style={{ flex: 1, gap: 2 }}>
        <Txt variant="meta" color={Colors.text60}>
          <Txt variant="metaMedium" color={Colors.text}>
            {item.inviter}
          </Txt>{' '}
          {item.text}
        </Txt>
        <View style={styles.inviteGroupRow}>
          <Txt variant="micro" color={Colors.text40}>
            •
          </Txt>
          <Txt variant="micro" color={Colors.lime}>
            {item.group}
          </Txt>
        </View>
        <Txt variant="micro" color={Colors.text40}>
          {item.note}
        </Txt>
      </View>
    </View>
  );
}

function Spans({ spans }: { spans: Span[] }) {
  return (
    <Txt variant="body" color={Colors.text} style={{ lineHeight: 19 }}>
      {spans.map((s, i) =>
        s.mention ? (
          <Txt key={i} variant="bodyMedium" color={Colors.lime}>
            {s.text}
          </Txt>
        ) : (
          s.text
        ),
      )}
    </Txt>
  );
}

export function ProfilePreview({ item }: { item: Extract<ChatItem, { kind: 'profile' }> }) {
  return (
    <View style={styles.profileWrap}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar source={Img[item.avatar]} size={40} ring={Colors.glass10} />
          <View style={{ flex: 1, gap: 3 }}>
            <View style={styles.nameRow}>
              <Txt variant="name" color={Colors.text}>
                {item.name}
              </Txt>
              <VerifiedBadge size={13} />
              <View style={styles.premiumTag}>
                <Txt variant="micro" color={Colors.lime}>
                  Premium
                </Txt>
              </View>
            </View>
            <Txt variant="micro" color={Colors.text40}>
              {item.role}
            </Txt>
          </View>
          <Pressable style={styles.profileBtn}>
            <Txt variant="microSemi" color={Colors.text}>
              Profile
            </Txt>
            <Icon name="chevron.right" size={11} color={Colors.text60} />
          </Pressable>
        </View>
        <View style={styles.locRow}>
          <Icon name="map.fill" size={11} color={Colors.text40} />
          <Txt variant="micro" color={Colors.text60}>
            {item.location}
          </Txt>
        </View>
      </View>
      <View style={styles.profileMsg}>
        <Spans spans={item.spans} />
      </View>
      <View style={styles.meta}>
        <Txt variant="micro" color={Colors.text40}>
          Edited
        </Txt>
        <Txt variant="micro" color={Colors.text40}>
          •
        </Txt>
        <Txt variant="micro" color={Colors.text40}>
          {item.time}
        </Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: Space.s, marginBottom: Space.l },
  line: { flex: 1, height: 1, backgroundColor: Colors.borderSoft },
  newPill: { backgroundColor: Colors.lime, paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill },
  invite: {
    flexDirection: 'row',
    gap: Space.s,
    alignItems: 'center',
    backgroundColor: Colors.glass03,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Space.m,
    marginBottom: Space.l,
  },
  inviteGroupRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  profileWrap: { paddingLeft: 40, marginBottom: Space.l, gap: 6 },
  profileCard: {
    backgroundColor: Colors.elevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Space.m,
    gap: Space.s,
  },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: Space.s },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  premiumTag: {
    backgroundColor: 'rgba(225,255,79,0.10)',
    borderRadius: Radius.pill,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.glass07,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  profileMsg: { backgroundColor: Colors.surface, borderRadius: Radius.bubble, borderTopLeftRadius: 6, padding: Space.m },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
});
