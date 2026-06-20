import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, View, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/mirra/Avatar';
import { Icon } from '@/components/mirra/Icon';
import { MessageBubble, VoiceBubble } from '@/components/mirra/MessageBubble';
import { Divider, InviteCard, ProfilePreview } from '@/components/mirra/SystemRows';
import { Txt } from '@/components/mirra/Txt';
import { groupHeader, messages } from '@/data/messages';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function IconButton({ name, onPress }: { name: Parameters<typeof Icon>[0]['name']; onPress?: () => void }) {
  return (
    <Pressable style={styles.iconBtn} hitSlop={8} onPress={onPress}>
      <Icon name={name} size={18} color={Colors.text} />
    </Pressable>
  );
}

function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 28 : 0} style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerRow}>
        <IconButton name="chevron.left" onPress={() => router.back()} />

        <View style={styles.headerCenter}>
          <Avatar source={Img[groupHeader.avatar]} size={56} radius={16} />
          <View style={styles.headerTitleRow}>
            <Txt variant="sender" color={Colors.text} numberOfLines={1}>
              {groupHeader.title}
            </Txt>
            <Icon name="bell.slash.fill" size={11} color={Colors.text40} />
            <Txt variant="meta" color={Colors.text40}>
              Muted
            </Txt>
          </View>
          <View style={styles.headerSubRow}>
            <Txt variant="micro" color={Colors.text30} style={{ fontFamily: 'Switzer-Regular' }}>
              {groupHeader.members}
            </Txt>
            <Txt variant="micro" color={Colors.text30} style={{ fontFamily: 'Switzer-Regular' }}>
              •
            </Txt>
            <Txt variant="micro" color={Colors.text60}>
              285
            </Txt>
            <Txt variant="micro" color={Colors.text30} style={{ fontFamily: 'Switzer-Regular' }}>
              Online
            </Txt>
          </View>
        </View>

        <IconButton name="ellipsis" />
      </View>
    </BlurView>
  );
}

function InputBar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.inputWrap, { paddingBottom: insets.bottom + 56 }]}>
      <View style={styles.inputBar}>
        <Pressable hitSlop={8} style={styles.inputIcon}>
          <Icon name="plus" size={18} color={Colors.text} />
        </Pressable>
        <TextInput
          placeholder="Write a message..."
          placeholderTextColor={Colors.text40}
          style={styles.input}
          allowFontScaling={false}
        />
        <Pressable hitSlop={8} style={styles.inputIcon}>
          <Icon name="mic.fill" size={18} color={Colors.text60} />
        </Pressable>
        <Pressable style={styles.sendBtn}>
          <Icon name="arrow.up" size={17} color={Colors.bg} />
        </Pressable>
      </View>
    </View>
  );
}

export default function MessagesScreen() {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
        {messages.map((item) => {
          switch (item.kind) {
            case 'msg':
              return <MessageBubble key={item.id} item={item} />;
            case 'voice':
              return <VoiceBubble key={item.id} item={item} />;
            case 'divider':
              return <Divider key={item.id} item={item} />;
            case 'invite':
              return <InviteCard key={item.id} item={item} />;
            case 'profile':
              return <ProfilePreview key={item.id} item={item} />;
          }
        })}
      </ScrollView>

      <Header />
      <InputBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Space.l, paddingTop: 150, paddingBottom: 150 },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: Space.m,
    paddingHorizontal: Space.l,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.45)' : 'rgba(10,10,10,0.97)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSoft,
    zIndex: 10,
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerCenter: { flex: 1, alignItems: 'center', gap: 6, paddingHorizontal: Space.s },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5, maxWidth: '100%' },
  headerSubRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Space.s,
    paddingHorizontal: Space.l,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(10,10,10,0.97)',
  },
  inputBar: {
    height: 56,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.black60,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: Space.s,
  },
  inputIcon: { width: 24, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, color: Colors.text, fontFamily: 'Switzer-Medium', fontSize: 14, padding: 0 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
});
