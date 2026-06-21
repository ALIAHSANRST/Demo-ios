import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/mirra/Avatar";
import { Icon } from "@/components/mirra/Icon";
import { MessageBubble, VoiceBubble } from "@/components/mirra/MessageBubble";
import {
  Divider,
  InviteCard,
  ProfilePreview,
} from "@/components/mirra/SystemRows";
import { Txt } from "@/components/mirra/Txt";
import { groupHeader, messages } from "@/data/messages";
import { Img } from "@/theme/images";
import { Colors, Radius, Space } from "@/theme/mirra";

function IconButton({
  name,
  onPress,
}: {
  name: Parameters<typeof Icon>[0]["name"];
  onPress?: () => void;
}) {
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
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerRow}>
        <IconButton name="chevron.left" onPress={() => router.back()} />

        <View style={styles.headerCenter}>
          <Avatar source={Img[groupHeader.avatar]} size={64} radius={16} />
          <View
            style={{
              borderRadius: Radius.lg,
              paddingHorizontal: Space.s,
              paddingVertical: 4,
              borderWidth: 1,
              borderColor: Colors.borderSoft,
              backgroundColor: Colors.glass10,
              width: "110%",
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <View style={styles.headerTitleRow}>
              <Icon name="person.2.fill" size={18} color={Colors.text80} />

              <Txt variant="sender" color={Colors.text} numberOfLines={1}>
                {groupHeader.title}
              </Txt>
            </View>
            <View style={styles.headerSubRow}>
              <Txt
                variant="micro"
                color={Colors.text30}
                style={{ fontFamily: "Switzer-Regular" }}
              >
                {groupHeader.members}
              </Txt>
              <Txt
                variant="micro"
                color={Colors.text30}
                style={{ fontFamily: "Switzer-Regular" }}
              >
                •
              </Txt>
              <Txt variant="micro" color={Colors.text60}>
                285
              </Txt>
              <Txt
                variant="micro"
                color={Colors.text30}
                style={{ fontFamily: "Switzer-Regular" }}
              >
                Online
              </Txt>
            </View>
          </View>
        </View>

        <IconButton name="ellipsis" />
      </View>
    </View>
  );
}

function InputBar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.inputWrap, {}]}>
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
      <Header />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: false })
        }
      >
        {messages.map((item) => {
          switch (item.kind) {
            case "msg":
              return <MessageBubble key={item.id} item={item} />;
            case "voice":
              return <VoiceBubble key={item.id} item={item} />;
            case "divider":
              return <Divider key={item.id} item={item} />;
            case "invite":
              return <InviteCard key={item.id} item={item} />;
            case "profile":
              return <ProfilePreview key={item.id} item={item} />;
          }
        })}
      </ScrollView>

      <InputBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Space.l, paddingTop: 150, paddingBottom: 0 },

  header: {
    paddingBottom: Space.m,
    paddingHorizontal: Space.l,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingHorizontal: Space.s,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    maxWidth: "100%",
  },
  headerSubRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrap: {
    paddingHorizontal: Space.l,
  },
  inputBar: {
    height: 56,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.black60,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: Space.s,
  },
  inputIcon: { width: 24, alignItems: "center", justifyContent: "center" },
  input: {
    flex: 1,
    color: Colors.text,
    fontFamily: "Switzer-Medium",
    fontSize: 14,
    padding: 0,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },
});
