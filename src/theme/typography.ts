import { colors } from './colors';

// Pixel-art type system:
// - "display" (Silkscreen) for headers/titles/buttons — blocky pixel font
// - "body" (VT323) for everything else — a lighter pixel font that stays
//   readable at small sizes (Press Start 2P does NOT — avoid it below ~16px)
export const fonts = {
  display: 'Silkscreen_400Regular',
  displayBold: 'Silkscreen_700Bold',
  body: 'VT323_400Regular',
};

export const type = {
  h1: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: 0.5 },
  h2: { fontFamily: fonts.display, fontSize: 15, letterSpacing: 0.5 },
  label: { fontFamily: fonts.display, fontSize: 11, letterSpacing: 0.5 },
  body: { fontFamily: fonts.body, fontSize: 19, lineHeight: 22 },
  caption: { fontFamily: fonts.body, fontSize: 16, color: colors.textSecondary },
};
