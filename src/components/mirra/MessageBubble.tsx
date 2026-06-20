import { View, StyleSheet } from 'react-native';

import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { Txt } from './Txt';
import type { ChatItem, Span } from '@/data/messages';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function SpanText({ spans }: { spans: Span[] }) {
  return (
    <Txt variant="message" color={Colors.text}>
      {spans.map((s, i) =>
        s.mention ? (
          <Txt key={i} variant="message" color={Colors.lime}>
            {s.text}
          </Txt>
        ) : (
          s.text
        ),
      )}
    </Txt>
  );
}

function RoleBadge({ role }: { role: 'Admin' | 'Owner' }) {
  const owner = role === 'Owner';
  return (
    <View style={[styles.roleBadge, { backgroundColor: owner ? Colors.lime : Colors.glass10 }]}>
      <Txt variant="microSemi" color={owner ? Colors.black60 : Colors.text80} style={{ fontFamily: 'Switzer-Medium' }}>
        {role}
      </Txt>
    </View>
  );
}

function NameRow({ name, role }: { name: string; role?: 'Admin' | 'Owner' }) {
  return (
    <View style={styles.nameRow}>
      <Txt variant="sender" color={Colors.text60}>
        {name}
      </Txt>
      {role && <RoleBadge role={role} />}
    </View>
  );
}

function MetaRow({ edited, time, sending }: { edited?: boolean; time: string; sending?: boolean }) {
  return (
    <View style={styles.meta}>
      {sending ? (
        <>
          <Txt variant="metaSemi" color={Colors.redBright}>
            Cancel Sending
          </Txt>
          <Txt variant="metaSemi" color={Colors.text80}>
            Resend
          </Txt>
        </>
      ) : (
        <>
          {edited && (
            <>
              <Txt variant="meta" color={Colors.text60}>
                Edited
              </Txt>
              <Txt variant="meta" color={Colors.text40}>
                •
              </Txt>
            </>
          )}
          <Txt variant="meta" color={Colors.text60}>
            {time}
          </Txt>
        </>
      )}
    </View>
  );
}

function Reactions({ reactions }: { reactions: { emoji: string; count: number }[] }) {
  return (
    <View style={styles.reactionRow}>
      {reactions.map((r, i) => (
        <View key={i} style={styles.reactionPill}>
          <Txt style={{ fontSize: 13 }}>{r.emoji}</Txt>
          <Txt variant="metaSemi" color={Colors.text80}>
            {r.count}
          </Txt>
        </View>
      ))}
    </View>
  );
}

export function MessageBubble({ item }: { item: Extract<ChatItem, { kind: 'msg' }> }) {
  if (item.own) {
    return (
      <View style={styles.ownWrap}>
        <View style={[styles.bubble, styles.ownBubble]}>
          <SpanText spans={item.spans} />
        </View>
        <MetaRow edited={item.edited} time={item.time} sending={item.sendState === 'sending'} />
      </View>
    );
  }
  return (
    <View style={styles.row}>
      <Avatar source={Img[item.avatar]} size={40} />
      <View style={styles.bubbleCol}>
        <NameRow name={item.name} role={item.role} />
        <View style={[styles.bubble, styles.inBubble]}>
          <SpanText spans={item.spans} />
        </View>
        {item.reactions && <Reactions reactions={item.reactions} />}
        <MetaRow edited={item.edited} time={item.time} />
      </View>
    </View>
  );
}

export function VoiceBubble({ item }: { item: Extract<ChatItem, { kind: 'voice' }> }) {
  const bars = [6, 12, 20, 14, 9, 18, 24, 16, 8, 13, 21, 11, 7, 15, 19, 10, 6, 14, 9, 5];
  return (
    <View style={styles.row}>
      <Avatar source={Img[item.avatar]} size={40} />
      <View style={styles.bubbleCol}>
        <NameRow name={item.name} role={item.role} />
        <View style={[styles.bubble, styles.inBubble, styles.voice]}>
          <View style={styles.playBtn}>
            <Icon name="play.fill" size={12} color={Colors.bg} />
          </View>
          <View style={styles.wave}>
            {bars.map((h, i) => (
              <View
                key={i}
                style={{ width: 2.5, height: h, borderRadius: 2, backgroundColor: i < 6 ? Colors.lime : Colors.glass20 }}
              />
            ))}
          </View>
          <Txt variant="meta" color={Colors.text60}>
            00:32
          </Txt>
        </View>
        <MetaRow time={item.time} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Row pad-right 120 keeps short bubbles from spanning full width (matches Figma R120/R16 range)
  row: { flexDirection: 'row', gap: Space.s, paddingRight: 44, marginBottom: Space.l },
  bubbleCol: { flex: 1, alignItems: 'flex-start', gap: 2 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 4 },
  roleBadge: { borderRadius: Radius.xxl, paddingHorizontal: 8, paddingVertical: 2 },
  bubble: { paddingHorizontal: Space.l, paddingVertical: Space.m, maxWidth: '100%' },
  inBubble: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 6,
    borderTopRightRadius: Radius.xl,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  ownWrap: { alignItems: 'flex-end', marginBottom: Space.l, paddingLeft: 44, gap: 2 },
  ownBubble: {
    backgroundColor: Colors.glass07,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 2 },
  reactionRow: { flexDirection: 'row', gap: Space.xs, marginTop: 2 },
  reactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 24,
    paddingLeft: Space.s,
    paddingRight: Space.xs,
    borderRadius: Radius.lg,
    backgroundColor: Colors.elevated,
  },
  voice: { flexDirection: 'row', alignItems: 'center', gap: Space.s, minWidth: 220 },
  playBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  wave: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2.5, height: 24 },
});
