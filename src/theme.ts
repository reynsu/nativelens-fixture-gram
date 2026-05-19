export const colors = {
  bg: "#ffffff",
  surface: "#fafafa",
  border: "#e5e5e5",
  text: "#111111",
  textMuted: "#737373",
  accent: "#ec4081",
  accentMuted: "#fde6ef",
  danger: "#dc2626",
  success: "#16a34a",
  tabActive: "#111111",
  tabInactive: "#a3a3a3",
  bubbleMe: "#3b82f6",
  bubbleOther: "#efefef",
  bubbleMeText: "#ffffff",
  bubbleOtherText: "#111111",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 6,
  md: 12,
  lg: 18,
  pill: 999,
};

export const type = {
  h1: { fontSize: 24, fontWeight: "700" as const },
  h2: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  small: { fontSize: 13, fontWeight: "400" as const },
  tiny: { fontSize: 11, fontWeight: "400" as const },
  bold: { fontSize: 15, fontWeight: "600" as const },
};

export const avatarPalette = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#c084fc",
  "#f472b6",
];

export function colorForHandle(handle: string): string {
  let h = 0;
  for (let i = 0; i < handle.length; i++) h = (h * 31 + handle.charCodeAt(i)) >>> 0;
  return avatarPalette[h % avatarPalette.length];
}
