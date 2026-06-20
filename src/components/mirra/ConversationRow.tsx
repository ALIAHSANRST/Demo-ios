import { Image } from 'expo-image';
import { View, StyleSheet, Pressable } from 'react-native';

import { Icon } from './Icon';
import { Txt } from './Txt';
import { VerifiedBadge } from './VerifiedBadge';
import type { Conversation } from '@/data/messages-list';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function UnreadBadge() {
  return (
    <View style={styles.unread}>
      <Txt variant="microSemi" color={Colors.bg}>
        2
      </Txt>
    </View>
  );
}

function TypingDots() {
  return (
    <View style={styles.typingDots}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={styles.dot} />
      ))}
    </View>
  );
}

export function ConversationRow({ item, onPress }: { item: Conversation; onPress?: () => void }) {
  if (item.kind === 'group') {
    return (
      <Pressable style={styles.row} onPress={onPress}>
        <Image source={Img[item.avatar]} style={styles.groupAvatar} contentFit="cover" />
        <View style={styles.body}>
          <View style={styles.nameRow}>
            <View style={styles.nameInner}>
              <Icon name="person.2.fill" size={13} color={Colors.text60} />
              <Txt variant="cardName" color={Colors.text} numberOfLines={1}>
                {item.name}
              </Txt>
            </View>
            <Txt variant="meta" color={Colors.text60}>
              {item.time}
            </Txt>
          </View>
          <View style={styles.previewRow}>
            <Txt variant="body" color={Colors.text80} style={{ fontFamily: 'Switzer-Semibold' }}>
              {item.sender}{' '}
            </Txt>
            <Txt variant="body" color={Colors.text60} numberOfLines={1} style={{ flex: 1 }}>
              {item.preview}
            </Txt>
            {item.seen && <Icon name="check.double" size={14} color={Colors.text40} />}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={Img[item.avatar]} style={styles.dmAvatar} contentFit="cover" />
      <View style={styles.body}>
        {/* Name + time */}
        <View style={styles.nameRow}>
          <View style={styles.nameInner}>
            <Txt variant="cardName" color={Colors.text} numberOfLines={1}>
              {item.name}
            </Txt>
            {item.verified && <VerifiedBadge size={12} />}
            {item.isNew && (
              <View style={styles.newBadge}>
                <Txt variant="microSemi" color={Colors.bg} style={{ fontFamily: 'Switzer-Medium' }}>
                  New
                </Txt>
              </View>
            )}
          </View>
          <Txt variant="meta" color={Colors.text60}>
            {item.time}
          </Txt>
        </View>

        {/* Preview */}
        <View style={styles.previewRow}>
          {item.previewVariant === 'typing' ? (
            <>
              <TypingDots />
              <Txt variant="body" color={Colors.text50} numberOfLines={1} style={{ flex: 1 }}>
                {item.preview}
              </Txt>
            </>
          ) : (
            <Txt variant="body" color={Colors.text60} numberOfLines={1} style={{ flex: 1 }}>
              {item.preview}
            </Txt>
          )}
          {item.unread ? <UnreadBadge /> : null}
        </View>

        {/* Chat / DP segment */}
        <View style={styles.segRow}>
          <Pressable style={[styles.segBtn, styles.segActive]}>
            <Txt variant="micro" color={Colors.text}>
              Chat
            </Txt>
            <View style={styles.segBadge}>
              <Txt variant="microSemi" color={Colors.bg}>
                2
              </Txt>
            </View>
          </Pressable>
          <Pressable style={styles.segBtn}>
            <Icon name="sparkles" size={13} color={Colors.lime} />
            <Txt variant="micro" color={Colors.text50}>
              {item.dpName}
            </Txt>
          </Pressable>
        </View>

        {/* Location */}
        {item.location && (
          <View style={styles.locRow}>
            <Icon name="mappin.and.ellipse" size={12} color={Colors.lime} />
            <Txt variant="metaMedium" color={Colors.text60}>
              {item.location}
            </Txt>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Space.m, paddingVertical: Space.s, alignItems: 'stretch' },
  dmAvatar: { width: 72, height: 108, borderRadius: Radius.lg, backgroundColor: Colors.surface },
  groupAvatar: { width: 56, height: 56, borderRadius: Radius.lg, backgroundColor: Colors.surface, alignSelf: 'center' },
  body: { flex: 1, justifyContent: 'center', gap: 6 },

  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Space.s },
  nameInner: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
  newBadge: { backgroundColor: Colors.lime, borderRadius: Radius.xxl, paddingHorizontal: 8, paddingVertical: 2 },

  previewRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  unread: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingDots: { flexDirection: 'row', gap: 3, alignItems: 'center' },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: Colors.lime },

  segRow: { flexDirection: 'row', gap: 2, marginTop: 2 },
  segBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    height: 28,
    borderRadius: Radius.xs,
  },
  segActive: { backgroundColor: Colors.glass03 },
  segBadge: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 },
});
