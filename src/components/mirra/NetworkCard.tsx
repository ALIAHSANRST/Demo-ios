import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import type { NetworkCard as TCard } from "@/data/network";
import { Img } from "@/theme/images";
import { Colors, Radius, Space } from "@/theme/mirra";
import { Avatar } from "./Avatar";
import { GlassBg } from "./GlassBg";
import { GradientBorder } from "./GradientBorder";
import { GradientFill } from "./GradientFill";
import { Icon } from "./Icon";
import { Txt } from "./Txt";
import { VerifiedBadge } from "./VerifiedBadge";

const CARD_H = 510;

/** A row of overlapping rounded-square icon chips (Interests / Pro Skills / Education). */
// Chips are tilted at alternating angles (Figma: +15° / −14°) for the scattered look.
const TILT = ["11deg", "-11deg"];

function IconStrip({
  items,
  extra,
}: {
  items: (keyof typeof Img)[];
  extra?: number;
}) {
  return (
    <View style={styles.strip}>
      {items.map((k, i) => (
        <View
          key={k}
          style={[
            styles.chip,
            i > 0 && { marginLeft: -15 },
            { transform: [{ rotate: TILT[i % 2] }] },
            {
              boxShadow: `0px 0px 4px rgba(255, 255, 255, 0.1)`,
              zIndex: i * 2,
            },
          ]}
        >
          <GlassBg />
          <Image source={Img[k]} style={styles.chipImg} contentFit="contain" />
          <View style={styles.chipDot} />
        </View>
      ))}
      {extra ? (
        <View
          style={[
            styles.chip,
            {
              marginLeft: -15,
              transform: [{ rotate: TILT[items.length % 2] }],
            },
          ]}
        >
          <GlassBg />
          <Txt variant="name" color={Colors.text80}>
            +{extra}
          </Txt>
        </View>
      ) : null}
    </View>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.infoBlock}>
      <Txt variant="blockLabel" color={Colors.text60}>
        {title}
      </Txt>
      {children}
    </View>
  );
}

export function NetworkCard({
  card,
  onConnect,
  onMessage,
}: {
  card: TCard;
  onConnect?: () => void;
  onMessage?: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image
        source={Img[card.photo]}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <GradientFill
        colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0)"]}
        style={styles.topGrad}
      />
      <GradientFill
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]}
        style={styles.btmGrad}
      />

      {/* Top: avatar + name + stats */}
      <View style={styles.topRow}>
        <Avatar source={Img[card.avatar]} size={32} />
        <View style={styles.nameCol}>
          <View style={styles.nameRow}>
            <Txt variant="cardName" color={Colors.text} numberOfLines={1}>
              {card.name}
            </Txt>
            <VerifiedBadge size={12} />
          </View>
          <Txt variant="metaMedium" color={Colors.text60} numberOfLines={1}>
            {card.role}
          </Txt>
        </View>
        <View style={styles.statsBar}>
          <Icon name="m.circle.fill" size={20} color={Colors.text} />
          <View>
            <Txt variant="sender" color={Colors.text}>
              {card.connections}
            </Txt>
            <Txt variant="statLabel" color={Colors.text80}>
              Connections
            </Txt>
          </View>
        </View>
      </View>

      {/* Bottom container */}
      <View style={styles.bottom}>
        {/* Carousel indicators */}
        <View style={styles.indicators}>
          {Array.from({ length: card.total }).map((_, i) => (
            <View
              key={i}
              style={i === card.activeIndex ? styles.dotActive : styles.dot}
            />
          ))}
        </View>

        {/* Location */}
        <View style={styles.locBadge}>
          <View style={styles.pulse}>
            <View style={styles.pulseOuter} />
            <View style={styles.pulseInner} />
          </View>
          <Icon name="location.north.fill" size={14} color={Colors.text80} />
          <Txt variant="loc" color={Colors.text80} numberOfLines={1}>
            {card.location}
          </Txt>
        </View>

        {/* Connect / DM */}
        <View style={styles.btnRow}>
          <Pressable style={styles.btn} onPress={onConnect}>
            <GlassBg />
            <Icon name="person.badge.plus" size={16} color={Colors.text} />
            <Txt variant="btnSm" color={Colors.text80}>
              Connect
            </Txt>
          </Pressable>
          <Pressable style={styles.btn} onPress={onMessage}>
            <GlassBg />
            <Icon name="paperplane.fill.small" size={16} color={Colors.text} />
            <Txt variant="btnSm" color={Colors.text80}>
              DM
            </Txt>
          </Pressable>
        </View>

        {/* Card Info */}
        <View style={styles.cardInfo}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.infoScroll}
          >
            <InfoBlock title="Interests">
              <IconStrip items={card.interests} extra={2} />
            </InfoBlock>
            <InfoBlock title="Pro Skills">
              <IconStrip items={card.skills} extra={2} />
            </InfoBlock>
            <InfoBlock title="Role">
              <View style={styles.rolePill}>
                <Icon
                  name="person.crop.circle.badge.checkmark"
                  size={14}
                  color={Colors.text60}
                />
                <Txt
                  variant="metaMedium"
                  color={Colors.text60}
                  numberOfLines={1}
                >
                  {card.roleText}
                </Txt>
              </View>
            </InfoBlock>
            <InfoBlock title="Education">
              <IconStrip items={[card.education]} />
            </InfoBlock>
          </ScrollView>
        </View>
      </View>

      <GradientBorder radius={Radius.card} strokeWidth={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_H,
    borderRadius: Radius.card,
    backgroundColor: Colors.surface,
    overflow: "hidden",
    padding: Space.m,
    justifyContent: "space-between",
  },
  topGrad: { position: "absolute", top: 0, left: 0, right: 0, height: 90 },
  btmGrad: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200 },

  topRow: { flexDirection: "row", alignItems: "center", gap: Space.xs },
  nameCol: { flex: 1, gap: 2, paddingLeft: 4 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: Space.xs },
  statsBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space.s,
    height: 38,
    paddingLeft: Space.l,
    paddingRight: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    overflow: "hidden",
  },

  bottom: { gap: Space.xs },
  indicators: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: Radius.xs,
    backgroundColor: Colors.glass03,
  },
  dotActive: {
    width: 16,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.text80,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.glass20,
  },

  locBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Space.xs,
    height: 34,
  },
  pulse: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseOuter: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lime,
    opacity: 0.2,
  },
  pulseInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.lime,
  },

  btnRow: { flexDirection: "row", gap: Space.xs },
  // Connect / DM (Figma "BlurButton+Outline"): glass05 fill, 0.5px white-5% border,
  // inset top highlight. Connect adds a 0.3 black "Dark Background Element".
  btn: {
    flex: 1,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Space.s,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass20,
    borderWidth: 0.5,
    borderColor: Colors.glass05,
    boxShadow: "inset 0px 0.5px 0px rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  btnDarken: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  // Android has no backdrop-blur, so the glass-over-photo surfaces use raised opacity
  // to read as frosted (not see-through), matching Figma's blurred panels.
  cardInfo: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass20,
    overflow: "hidden",
    paddingVertical: Space.s,
  },
  infoScroll: {
    gap: Space.s,
    paddingHorizontal: Space.m,
    paddingTop: Space.s,
    paddingBottom: Space.xs,
  },
  infoBlock: { gap: Space.s },

  strip: { flexDirection: "row", alignItems: "center", height: 49 },
  // Glass chip (Figma): white-5% fill + blur(20) [GlassBg], 0.5px white-5% border, inset top highlight.
  chip: {
    width: 49,
    height: 49,
    borderRadius: Radius.sm,
    borderWidth: 0.5,
    borderColor: Colors.glass10,
    boxShadow: "inset 0px 0.5px 0px rgba(255,255,255,0.1)",
    overflow: "hidden",
    backgroundColor: Colors.glass10,
    alignItems: "center",
    justifyContent: "center",
  },
  chipImg: { width: 30, height: 30 },
  chipDot: {
    position: "absolute",
    bottom: 6,
    alignSelf: "center",
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.lime,
  },

  rolePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space.xs,
    height: 40,
    paddingHorizontal: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass10,
    maxWidth: 282,
  },
});
