// Two-role type system:
// - "display" (Fredoka) for headers/titles — rounded, friendly, a little playful
// - "body" (Nunito Sans) for everything else — calm and readable
//
// Load these with expo-font in App.tsx before rendering (see App.tsx).
export const fonts = {
  display: 'Fredoka_600SemiBold',
  displayBold: 'Fredoka_500Medium',
  body: 'NunitoSans_400Regular',
  bodySemibold: 'NunitoSans_700Bold',
};

export const type = {
  h1: { fontFamily: fonts.display, fontSize: 28, letterSpacing: 0.2 },
  h2: { fontFamily: fonts.display, fontSize: 20, letterSpacing: 0.2 },
  label: { fontFamily: fonts.bodySemibold, fontSize: 13, letterSpacing: 0.4 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: fonts.body, fontSize: 12, color: '#6B7268' },
};
