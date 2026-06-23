import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import type { Block, Contact } from "@/data/contacts";
import { Img } from "@/theme/images";
import { Colors, Radius, Space } from "@/theme/mirra";
import { Icon } from "./Icon";
import { Txt } from "./Txt";
import { VerifiedBadge } from "./VerifiedBadge";

const EMOJIS = {
  "🎾": require("@/assets/mirra/emojis/tennis-emoji.png"),
  "⛳": require("@/assets/mirra/emojis/golf-emoji.png"),
  "✈️": require("@/assets/mirra/emojis/travel-emoji.png"),
  "🎥": require("@/assets/mirra/emojis/webflow-emoji.png"),
  "🎬": require("@/assets/mirra/emojis/figma-emoji.png"),
  "📷": require("@/assets/mirra/emojis/videography-emoji.png"),
};

function IconChips({ icons, more }: { icons: string[]; more?: number }) {
  return (
    <View style={styles.chipRow}>
      {icons.map((ic, i) => (
        <View
          key={i}
          style={[
            styles.chip,
            {
              transform: [{ rotate: i % 2 === 0 ? "-10deg" : "10deg" }],
              left: i * -8,
              boxShadow: `0px 0px 4px rgba(255, 255, 255, 0.1)`,
              zIndex: i * 2,
            },
          ]}
        >
          {EMOJIS[ic as keyof typeof EMOJIS] ? (
            <Image
              source={EMOJIS[ic as keyof typeof EMOJIS]}
              style={{ width: 24, height: 24 }}
            />
          ) : (
            <Txt style={{ fontSize: 18 }}>{ic}</Txt>
          )}
        </View>
      ))}
      {more ? (
        <View
          style={[
            styles.chip,
            {
              left: icons.length * -8,
              transform: [
                { rotate: icons.length % 2 === 0 ? "-10deg" : "10deg" },
              ],
              zIndex: icons.length * 2,
              boxShadow: `0px 0px 4px rgba(255, 255, 255, 0.1)`,
            },
          ]}
        >
          <Txt
            variant="bodyMedium"
            color={Colors.text80}
            style={{ fontFamily: "Switzer-Semibold" }}
          >
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
      {block.kind === "text" ? (
        <View style={styles.textPill}>
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 3,
              height: 3,
              borderRadius: Radius.lg,
              backgroundColor: Colors.lime,
              boxShadow: "0px 0px 6px 1px rgba(225, 255, 79, 0.88)",
            }}
          />
          {block.icon && (
            <Icon name={block.icon as any} size={12} color={Colors.lime} />
          )}
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
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image
          source={Img[contact.photo]}
          style={styles.photo}
          contentFit="cover"
        />

        <View style={styles.info}>
          <View>
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
          </View>

          <View style={styles.btnRow}>
            <Pressable
              style={styles.dmBtn}
              onPress={() => router.push("/chat")}
            >
              <Icon name="paperplane.fill" size={14} color={Colors.text80} />
              <Txt variant="meta" color={Colors.text80}>
                DM
              </Txt>
            </Pressable>
            <Pressable
              style={styles.chatBtn}
              onPress={() => router.push("/dp-chat")}
            >
              <Icon name="dpEmojiHappy" size={18} color={Colors.text80} />
              <Txt variant="metaSemi" color={Colors.text80}>
                Chat with DP
              </Txt>
            </Pressable>
            <Pressable
              style={styles.requestBtn}
              onPress={() => router.push("/chat")}
            >
              <Icon name="personRequestDone" size={18} color={Colors.text80} />
            </Pressable>
          </View>

          <Pressable
            style={styles.visitBtn}
            onPress={() => router.push("/profile")}
          >
            <Txt variant="meta" color={Colors.text80}>
              Visit Profile
            </Txt>
          </Pressable>
        </View>
      </View>

      <View style={styles.commonSection}>
        {/* <View style={styles.commonHeader}>
          <Icon name="check.double" size={13} color={Colors.lime} />

          <View style={styles.commonBadge}>
            <Txt variant="microSemi" color={Colors.text80}>
              {contact.inCommon}
            </Txt>
          </View>
        </View> */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.blocksRow}
          style={{ marginTop: Space.m }}
        >
          {contact.blocks.map((b, i) => (
            <CommonBlock key={i} block={b} />
          ))}
        </ScrollView>
      </View>

      {/* <GradientBorder radius={Radius.xxl} strokeWidth={1} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass05,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    // borderColor: Colors.borderSoft,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    gap: Space.m,
    padding: 0,
    paddingRight: Space.l,
    backgroundColor: Colors.glass02,
  },
  photo: {
    width: 100,
    height: 164,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
  },
  info: { flex: 1, gap: 6, paddingTop: 13 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameInner: { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  menuBtn: {
    width: 28,
    height: 28,
    // borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.glass05,
  },

  btnRow: { flexDirection: "row", gap: Space.s, marginTop: 4 },
  dmBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    paddingHorizontal: Space.m,
    height: 36,
    borderRadius: Radius.sm,
  },
  requestBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Space.s,
    height: 36,
  },
  chatBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.glass05,
    height: 36,
    borderRadius: Radius.xs,
    paddingHorizontal: Space.m,
  },
  visitBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    height: 36,
    borderRadius: Radius.sm,
    marginTop: 2,
    marginBottom: Space.m,
  },

  commonSection: { paddingVertical: Space.m, gap: Space.s },
  commonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: Space.m,
  },
  commonBadge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: Colors.glass10,
    alignItems: "center",
    justifyContent: "center",
  },

  blocksRow: { flexDirection: "row", gap: Space.s, paddingHorizontal: Space.m },
  block: { gap: 4 },
  textPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 46,
    paddingHorizontal: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
  },
  chipRow: { flexDirection: "row", gap: 4, paddingVertical: 3 },
  chip: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: "rgb(40,40,40,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
});
