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

  primary: "#66b84d", // moss green
  primaryDark: "#457238",
  primaryLight: "#93c982",

  waterFresh: "#6bab58", // just watered / plenty of timewaterSoon: "#E8A33D", // marigold — due in a day or
  waterSoon: "#E8A33D", // marigold — due in a day or two
  waterOverdue: "#C97B5D", // terracotta — overdue

  outline: "#273419", // thick pixel border color, used everywhere instead of soft borders
  hardShadow: "#213517", // solid offset "shadow" block behind cards/buttons
  border: "#2c3e21",
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
