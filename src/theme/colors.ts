// Design tokens — keep every color reference in the app pointing here.
// Pixel-art rules: flat colors only, no gradients, no soft shadowColor/opacity.
// Depth comes from `hardShadow` (an offset solid block behind elements).
export const colors = {
  background: "#EDF1E9", // soft sage
  surface: "#FFFFFF",
  surfaceMuted: "#E1E8DB",

  textPrimary: "#2B2E28",
  textSecondary: "#6B7268",
  textOnPrimary: "#FFFFFF",

  primary: "#4A6741", // moss green
  primaryDark: "#374E30",
  primaryLight: "#7EA871",

  waterFresh: "#4A6741", // just watered / plenty of time
  waterSoon: "#E8A33D", // marigold — due in a day or two
  waterOverdue: "#C97B5D", // terracotta — overdue

  outline: "#1A1A1A", // thick pixel border color, used everywhere instead of soft borders
  hardShadow: "#1A1A1A", // solid offset "shadow" block behind cards/buttons
  border: "#1A1A1A",
};

// Standard pixel-art metrics — reuse these instead of one-off numbers so
// every border/shadow in the app stays visually consistent.
export const pixel = {
  borderWidth: 3,
  shadowOffset: 8, // how far the hard shadow block sits behind an element
  pressOffset: 4, // how far a button moves toward its shadow when pressed
  step: 6, // size of the "notched" pixel cut on stepped corners
  radius: 0, // pixel UI never uses borderRadius
};
