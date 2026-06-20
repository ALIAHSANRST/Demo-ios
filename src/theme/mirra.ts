/**
 * MIRRA design tokens — extracted directly from the Figma file "Test Tatum".
 * Primary typeface: Switzer (embedded via expo-font as Switzer-{Regular,Medium,Semibold}).
 */

export const Font = {
  regular: 'Switzer-Regular',
  medium: 'Switzer-Medium',
  semibold: 'Switzer-Semibold',
  bold: 'Switzer-Bold',
} as const;

export const Colors = {
  // Backgrounds
  bg: '#000000',
  surface: '#1a1a1a',
  surfaceAlt: '#151515',
  elevated: '#292a2c',

  // Glass surfaces are white-over-black at low opacity (signature look)
  glass02: 'rgba(255,255,255,0.02)',
  glass03: 'rgba(255,255,255,0.03)',
  glass05: 'rgba(255,255,255,0.05)',
  glass07: 'rgba(255,255,255,0.07)',
  glass10: 'rgba(255,255,255,0.10)',
  glass20: 'rgba(255,255,255,0.20)',

  // Hairline borders
  border: 'rgba(255,255,255,0.08)',
  borderSoft: 'rgba(255,255,255,0.05)',
  borderStrong: 'rgba(255,255,255,0.12)',

  // Accent — lime / chartreuse
  lime: '#e1ff4f',
  limeSoft: '#eaff84',

  // Blue
  verified: '#26b7ff',
  link: '#628eff',

  // Reds
  red: '#ff453a',
  redBright: '#f51d1d',
  redDeep: '#cb132a',

  // Text hierarchy
  text: '#ffffff',
  text80: 'rgba(255,255,255,0.80)',
  text60: 'rgba(255,255,255,0.60)',
  text50: 'rgba(255,255,255,0.50)',
  text40: 'rgba(255,255,255,0.40)',
  text30: 'rgba(255,255,255,0.30)',

  black40: 'rgba(0,0,0,0.40)',
  black60: 'rgba(0,0,0,0.60)',
} as const;

export const Radius = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 20,
  card: 22,
  bubble: 18,
  pill: 999,
} as const;

export const Space = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
} as const;

/**
 * Type scale (size / lineHeight / letterSpacing) lifted from the Figma text styles.
 */
export const Type = {
  // Contacts "Contacts" title
  screenTitle: { fontFamily: Font.medium, fontSize: 24, lineHeight: 26, letterSpacing: -0.2 },
  // Messages "Messages" title (Switzer Bold 20/24)
  msgTitle: { fontFamily: Font.bold, fontSize: 20, lineHeight: 24 },
  // Contact card name
  cardName: { fontFamily: Font.semibold, fontSize: 16, lineHeight: 18 },
  // Chat message body (Switzer Medium 16/20)
  message: { fontFamily: Font.medium, fontSize: 16, lineHeight: 20 },
  // Sender name in chat / banner title (600 14/16 ls-0.24)
  sender: { fontFamily: Font.semibold, fontSize: 14, lineHeight: 16, letterSpacing: -0.24 },
  name: { fontFamily: Font.semibold, fontSize: 14, lineHeight: 18, letterSpacing: -0.2 },
  body: { fontFamily: Font.regular, fontSize: 14, lineHeight: 18 },
  bodyMedium: { fontFamily: Font.medium, fontSize: 14, lineHeight: 18 },
  // Edited / timestamp (400 12/16)
  meta: { fontFamily: Font.regular, fontSize: 12, lineHeight: 16 },
  metaMedium: { fontFamily: Font.medium, fontSize: 12, lineHeight: 16 },
  metaSemi: { fontFamily: Font.semibold, fontSize: 12, lineHeight: 16 },
  // Block titles in card (400 10/12 ls-0.08)
  blockLabel: { fontFamily: Font.regular, fontSize: 10, lineHeight: 12, letterSpacing: -0.08 },
  micro: { fontFamily: Font.medium, fontSize: 10, lineHeight: 12 },
  microSemi: { fontFamily: Font.semibold, fontSize: 10, lineHeight: 12 },

  // ---- Exact styles added during pixel-perfect pass ----
  // Stat unit labels "Connections" / "Followers" (Switzer Medium 10/14)
  statLabel: { fontFamily: Font.medium, fontSize: 10, lineHeight: 14 },
  // Location pill text (Switzer Semibold 14/18, no tracking)
  loc: { fontFamily: Font.semibold, fontSize: 14, lineHeight: 18 },
  // Pill/CTA button label (Switzer Regular 14/18 ls-0.25) — Train AI Chat, View Profile, etc.
  btn: { fontFamily: Font.regular, fontSize: 14, lineHeight: 18, letterSpacing: -0.25 },
  // Small button label (Switzer Regular 12/12) — Connect / DM
  btnSm: { fontFamily: Font.regular, fontSize: 12, lineHeight: 12 },
  // Big stat number (Switzer Medium 20/28) — profile insights
  statNum: { fontFamily: Font.medium, fontSize: 20, lineHeight: 28 },
  // DP hero title (Switzer Semibold 32/36 ls-1)
  hero: { fontFamily: Font.semibold, fontSize: 32, lineHeight: 36, letterSpacing: -1 },
} as const;
