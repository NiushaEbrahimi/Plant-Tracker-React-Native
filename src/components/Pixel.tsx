import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, StyleProp, PressableProps } from 'react-native';
import { colors, pixel } from '../theme/colors';

/**
 * PixelPanel — a static card with a solid offset "shadow" block behind it
 * instead of a soft box-shadow. Sharp corners only (no borderRadius).
 *
 * How the offset works: the wrapper reserves extra space on its
 * bottom-right (padding), the shadow block fills that reserved area plus
 * the panel's footprint, and the panel itself sits flush top-left — so the
 * shadow block peeks out from behind, bottom-right, like a drop-shadow with
 * zero blur.
 */
export function PixelPanel({
  children,
  style,
  backgroundColor = colors.surface,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}) {
  return (
    <View style={styles.shadowWrap}>
      <View style={styles.shadowBlock} />
      <View
        style={[
          styles.panel,
          { backgroundColor, borderColor: colors.outline },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

/**
 * PixelButton — same hard-shadow language, but shifts toward its own
 * shadow on press to fake a "pushed in" 8-bit button.
 */
interface PixelButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export function PixelButton({
  children,
  backgroundColor = colors.primary,
  style,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: PixelButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={[styles.shadowWrap, disabled && styles.disabled]}>
      <View style={styles.shadowBlock} />
      <Pressable
        disabled={disabled}
        onPressIn={(e) => {
          setPressed(true);
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          setPressed(false);
          onPressOut?.(e);
        }}
        style={[
          styles.panel,
          {
            backgroundColor,
            borderColor: colors.outline,
            transform: [
              { translateX: pressed ? pixel.pressOffset : 0 },
              { translateY: pressed ? pixel.pressOffset : 0 },
            ],
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    position: 'relative',
    paddingRight: pixel.shadowOffset,
    paddingBottom: pixel.shadowOffset,
  },
  shadowBlock: {
    position: 'absolute',
    top: pixel.shadowOffset,
    left: pixel.shadowOffset,
    right: 0,
    bottom: 0,
    backgroundColor: colors.hardShadow,
  },
  panel: {
    borderWidth: pixel.borderWidth,
    borderRadius: pixel.radius,
  },
  disabled: { opacity: 0.5 },
});
