import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ContactCard } from "@/components/mirra/ContactCard";
import { GradientBorder } from "@/components/mirra/GradientBorder";
import { Icon } from "@/components/mirra/Icon";
import { Txt } from "@/components/mirra/Txt";
import { categories, categoryIcons, contacts } from "@/data/contacts";
import { Img } from "@/theme/images";
import { Colors, Radius, Space } from "@/theme/mirra";

const EMOJIS = {
  tennis: require("@/assets/mirra/emojis/tennis-emoji.png"),
  golf: require("@/assets/mirra/emojis/golf-emoji.png"),
  travel: require("@/assets/mirra/emojis/travel-emoji.png"),
};

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Txt variant="screenTitle" color={Colors.text}>
          Contacts
        </Txt>
        <View style={styles.titleBadge}>
          <Txt variant="metaSemi" color={Colors.text80}>
            1
          </Txt>
        </View>
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.sqBtn}>
          <View style={styles.searchGlow} />
          <Icon name="magnifyingglass" size={18} color={Colors.text} />
          <View style={styles.searchSparkle}>
            <Icon name="sparkle.fill" size={9} color={Colors.text} />
          </View>
          <GradientBorder radius={Radius.lg} strokeWidth={1} />
        </Pressable>
        <Pressable style={[styles.sqBtn, styles.sqBtnOutline]}>
          <Icon name="plus" size={18} color={Colors.text} />
          <GradientBorder radius={Radius.lg} strokeWidth={1} />
        </Pressable>
      </View>
    </View>
  );
}

function CountBadge({ value, lime }: { value: number; lime?: boolean }) {
  return (
    <View style={[styles.countBadge, lime && { backgroundColor: Colors.lime }]}>
      <Txt variant="microSemi" color={lime ? Colors.bg : Colors.text80}>
        {value}
      </Txt>
    </View>
  );
}

/** Two-tab segmented control — "MIRRA Connections" is the active tab in this frame. */
function BigTabs() {
  const [active, setActive] = useState<"saved" | "mirra">("mirra");
  return (
    <View style={styles.bigTabs}>
      <Pressable
        onPress={() => setActive("saved")}
        style={[styles.bigTab, active === "saved" && styles.bigTabOn]}
      >
        <Icon
          name="savedContactsOutlineIcon"
          size={16}
          color={active === "saved" ? Colors.text : Colors.text50}
        />
        <Txt
          variant="metaMedium"
          color={active === "saved" ? Colors.text : Colors.text50}
        >
          Saved Contacts
        </Txt>
        <CountBadge value={2} />
      </Pressable>
      <Pressable
        onPress={() => setActive("mirra")}
        style={[styles.bigTab, active === "mirra" && styles.bigTabOn]}
      >
        <Icon
          name="userPlusOutlineIcon"
          size={16}
          color={active === "mirra" ? Colors.text : Colors.text50}
        />
        <Txt
          variant="metaMedium"
          color={active === "mirra" ? Colors.text : Colors.text50}
        >
          MIRRA Connections
        </Txt>
        <CountBadge value={2} lime />
      </Pressable>
      <GradientBorder radius={Radius.md} strokeWidth={1} />
    </View>
  );
}

function SegToggle() {
  const [active, setActive] = useState("Grid");
  const items: { label: string; icon: Parameters<typeof Icon>[0]["name"] }[] = [
    { label: "Grid", icon: "gridToggleIcon" },
    { label: "List", icon: "listToggleIcon" },
    { label: "Map", icon: "mapPointIcon" },
  ];
  return (
    <View style={styles.seg}>
      {items.map((it) => {
        const on = active === it.label;
        return (
          <Pressable
            key={it.label}
            onPress={() => setActive(it.label)}
            style={[styles.segItem, on && styles.segItemOn]}
          >
            <Icon
              name={it.icon}
              size={14}
              color={on ? Colors.text : Colors.text40}
            />
            <Txt variant="micro" color={on ? Colors.text : Colors.text40}>
              {it.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          gap: Space.l,
        }}
      >
        {/* Two big tabs */}
        <BigTabs />

        {/* Location + filter + sort + segmented toggle */}
        <View style={styles.filterRow}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: Space.s,
            }}
          >
            <Pressable
              style={[styles.locChip, { flexShrink: 1, overflow: "hidden" }]}
            >
              <Icon name="mapPointIcon" size={14} color={Colors.text50} />
              <Txt variant="metaMedium" color={Colors.text50} numberOfLines={1}>
                Mission Beach, San Diego
              </Txt>
            </Pressable>
            <Pressable style={styles.filterBtn}>
              <Icon name="filterFunnel" size={16} color={Colors.lime} />
            </Pressable>
            <Pressable style={styles.sortBtn}>
              <Icon name="filterSortDown" size={15} color={Colors.text60} />
            </Pressable>
          </View>
          <View style={styles.vDivider} />
          <View style={{ flex: 1 }}>
            <SegToggle />
          </View>
        </View>

        {/* Category tabs */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catRow}
          >
            {categories.map((cat) => (
              <Pressable key={cat} style={styles.catTab}>
                {cat.toLowerCase() === "tennis" ||
                cat.toLowerCase() === "golf" ||
                cat.toLowerCase() === "travel" ? (
                  <Image
                    source={EMOJIS[cat.toLowerCase() as keyof typeof EMOJIS]}
                    style={{ width: 22, height: 22 }}
                  />
                ) : (
                  <Txt style={{ fontSize: 14 }}>{categoryIcons[cat]}</Txt>
                )}
                <Txt variant="metaSemi" color={Colors.text80}>
                  {cat}
                </Txt>
              </Pressable>
            ))}
          </ScrollView>
          <View style={{ position: "relative" }}>
            <Pressable style={styles.catSearch}>
              <Icon name="magnifyingglass" size={16} color={Colors.text60} />
            </Pressable>
            <View
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                width: 44,
                height: 44,
                borderRadius: Radius.sm,
                boxShadow: "inset 4px 0px 8px rgba(255, 255, 255, 0.05)",
              }}
            ></View>
          </View>
        </View>

        {/* Connection requests banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1, gap: 2 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Txt variant="sender" color={Colors.text80}>
                Connection Requests
              </Txt>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: Radius.lg,
                  backgroundColor: Colors.lime,
                  boxShadow: "0px 0px 8px 1px rgba(225, 255, 79, 0.88)",
                }}
              />
            </View>
            <Txt variant="metaMedium" color={Colors.text50}>
              You have 2 new connection requests
            </Txt>
          </View>
          <View style={styles.avatarStack}>
            <Image
              source={Img.chelsea}
              style={[
                styles.stackAvatar,
                {
                  left: 0,
                  transform: [{ rotate: "-11deg" }],
                },
              ]}
              contentFit="cover"
            />
            <Image
              source={Img.reqJordan}
              style={[
                styles.stackAvatar,
                {
                  left: 16,
                  transform: [{ rotate: "11deg" }],
                },
              ]}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Contact cards */}
        {contacts.map((c) => (
          <ContactCard key={c.id} contact={c} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchGlow: {
    position: "absolute",
    bottom: -22,
    alignSelf: "center",
    width: 30,
    height: 22,
    borderRadius: 16,
    // backgroundColor: "#1d4afe",
    boxShadow: "0px 0px 12px 2px rgba(29,74,254,0.9)",
  },
  searchSparkle: { position: "absolute", top: 4, right: 5 },
  screen: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Space.l },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Space.l,
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: Space.s },
  titleBadge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  headerActions: { flexDirection: "row", gap: Space.s },
  sqBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  sqBtnOutline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },

  bigTabs: {
    flexDirection: "row",
    gap: Space.xs,
    height: 40,
    padding: 4,
    borderRadius: Radius.md,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  bigTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: Radius.xs,
  },
  bigTabOn: {
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass10,
    alignItems: "center",
    justifyContent: "center",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space.s,
    height: 32,
  },
  locChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 32,
    paddingHorizontal: Space.m,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(29, 74, 254, 1)",
    boxShadow: "0px 0px 8px rgba(38, 183, 255, 1)",
  },
  sortBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  vDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: Colors.glass20,
  },
  seg: {
    flex: 1,
    flexDirection: "row",
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
    padding: 2,
    gap: 2,
  },
  segItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: Radius.xs,
  },
  segItemOn: {
    backgroundColor: Colors.glass05,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderSoft,
  },

  catRow: { gap: Space.s, alignItems: "center", paddingRight: Space.s },
  catTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.glass07,
    padding: Space.s,
    borderRadius: Radius.sm,
  },
  catSearch: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass07,
    borderWidth: 0.5,
    borderColor: Colors.glass07,
    boxShadow: "inset 0px 0.5px 0px rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.glass03,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Space.m,
  },
  avatarStack: { width: 52, height: 36 },
  stackAvatar: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: Radius.xs,
    // borderWidth: 2,
    borderColor: Colors.bg,
    backgroundColor: Colors.glass20,
  },
});
