import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/mirra/Avatar';
import { GradientBorder } from '@/components/mirra/GradientBorder';
import { GradientFill } from '@/components/mirra/GradientFill';
import { Icon } from '@/components/mirra/Icon';
import { Txt } from '@/components/mirra/Txt';
import { dpChat } from '@/data/dp-chat';
import { Img } from '@/theme/images';
import { Colors, Radius, Space } from '@/theme/mirra';

function Bubble({ from, text, time }: { from: 'dp' | 'me'; text: string; time: string }) {
  const me = from === 'me';
  return (
    <View style={[styles.bubbleWrap, me && { alignItems: 'flex-end' }]}>
      <View style={[styles.bubble, me ? styles.bubbleMe : styles.bubbleDp]}>
        <Txt variant="message" color={me ? Colors.text : Colors.text80}>
          {text}
        </Txt>
        <View style={styles.bubbleMeta}>
          <Icon name="doc.on.doc" size={16} color={Colors.text50} />
          <Txt variant="metaMedium" color={Colors.text40}>
            {time}
          </Txt>
        </View>
      </View>
    </View>
  );
}

function Typing() {
  return (
    <View style={styles.typing}>
      <View style={styles.typingDots}>
        <View style={[styles.tDot, { opacity: 0.2 }]} />
        <View style={[styles.tDot, { opacity: 0.5 }]} />
        <View style={styles.tDot} />
      </View>
      <Txt variant="meta" color={Colors.text50}>
        Typing...
      </Txt>
    </View>
  );
}

export default function DpChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [text, setText] = useState('');

  return (
    <View style={styles.root}>
      {/* Blurred profile backdrop */}
      <Image source={Img[dpChat.backdrop]} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={Platform.OS === 'android' ? 25 : 0} />
      <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 60 : 0} style={StyleSheet.absoluteFill} />
      <View style={styles.scrim} />

      {/* Chatbot sheet */}
      <View style={[styles.sheet, { paddingTop: insets.top + 8 }]}>
        <Image source={Img.chatWave} style={styles.wave} contentFit="cover" pointerEvents="none" />
        <View style={styles.grabber} />
        <Pressable style={styles.closeBtn} onPress={() => router.back()}>
          <Icon name="xmark" size={18} color={Colors.text} />
          <GradientBorder radius={Radius.lg} strokeWidth={0.5} />
        </Pressable>

        {/* Persona toggle */}
        <View style={styles.toggle}>
          <View style={[styles.toggleItem, styles.toggleOn]}>
            <Avatar source={Img[dpChat.avatar]} size={20} radius={6} />
            <Txt variant="metaSemi" color={Colors.text}>
              Chat with {dpChat.name}
            </Txt>
            <GradientBorder radius={Radius.sm} strokeWidth={0.5} />
          </View>
          <View style={styles.toggleItem}>
            <Icon name="sparkle.fill" size={14} color={Colors.text50} />
            <Txt variant="metaSemi" color={Colors.text50}>
              Digital Persona
            </Txt>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <Txt variant="hero" color={Colors.text50}>
            {dpChat.title}
          </Txt>
          {dpChat.messages.map((m) => (
            <Bubble key={m.id} {...m} />
          ))}
          <Typing />
        </ScrollView>

        {/* Input + anonymous pill */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.inputArea, { paddingBottom: insets.bottom + Space.s }]}>
            <View style={styles.inputBar}>
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Ask me anything"
                placeholderTextColor={Colors.text40}
                style={styles.input}
                allowFontScaling={false}
              />
              <Pressable hitSlop={8} style={styles.micBtn}>
                <Icon name="mic.fill" size={18} color={Colors.text60} />
              </Pressable>
              <Pressable style={styles.sendBtn}>
                <GradientFill colors={['#1d4afe', '#26b7ff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
                <Icon name="arrow.up" size={17} color={Colors.text} />
              </Pressable>
              <GradientBorder radius={Radius.lg} strokeWidth={1} />
            </View>
            <View style={styles.anonPill}>
              <View style={styles.pulseInner} />
              <Txt variant="metaMedium" color={Colors.text60}>
                Anonymous Mode is on
              </Txt>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)' },

  sheet: {
    flex: 1,
    marginTop: 56,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.92)',
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    overflow: 'hidden',
    paddingHorizontal: Space.xl,
  },
  wave: { position: 'absolute', bottom: 120, left: -120, right: -120, height: 360, opacity: 0.5 },
  grabber: { position: 'absolute', top: 10, alignSelf: 'center', width: 50, height: 5, borderRadius: 3, backgroundColor: Colors.text80 },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggle: {
    flexDirection: 'row',
    gap: Space.xs,
    padding: 4,
    marginTop: Space.xl,
    borderRadius: Radius.md,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  toggleItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 36, borderRadius: Radius.xs },
  toggleOn: { backgroundColor: Colors.glass07, overflow: 'hidden' },

  scroll: { paddingTop: Space.xxl, paddingBottom: Space.l, gap: Space.l },

  bubbleWrap: { alignItems: 'flex-start' },
  bubble: { maxWidth: 296, paddingVertical: Space.m, paddingHorizontal: Space.l, borderRadius: Radius.lg, gap: Space.s },
  bubbleDp: { backgroundColor: Colors.glass03, borderTopLeftRadius: Radius.lg, borderBottomLeftRadius: 4, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.glass05 },
  bubbleMe: { backgroundColor: Colors.glass07, borderBottomRightRadius: 4 },
  bubbleMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  typing: { flexDirection: 'row', alignItems: 'center', gap: Space.s, paddingHorizontal: Space.m },
  typingDots: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.text },

  inputArea: { gap: Space.m, paddingTop: Space.s, alignItems: 'center' },
  inputBar: {
    width: '100%',
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Space.l,
    gap: Space.s,
    overflow: 'hidden',
  },
  input: { flex: 1, color: Colors.text, fontFamily: 'Switzer-Medium', fontSize: 14, lineHeight: 18, padding: 0 },
  micBtn: { width: 28, alignItems: 'center', justifyContent: 'center' },
  sendBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },

  anonPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: Space.m, borderRadius: Radius.pill, backgroundColor: Colors.glass05 },
  pulseInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.lime },
});
