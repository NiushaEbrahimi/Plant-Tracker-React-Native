import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

type LeafConfig = {
  origin: string;
  fromDeg: number;
  toDeg: number;
  duration: number;
  delay: number;
};

const LEAVES: Record<'left' | 'center' | 'right', LeafConfig> = {
  left: { origin: '192,283', fromDeg: -3, toDeg: 2, duration: 1800, delay: 0 },
  center: { origin: '251.5,283', fromDeg: -1.5, toDeg: 1.8, duration: 2100, delay: 600 },
  right: { origin: '312.5,283', fromDeg: 3, toDeg: -2, duration: 1950, delay: 1400 },
};

function useSway({ origin, fromDeg, toDeg, duration, delay }: LeafConfig) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, duration, delay]);

  return anim.interpolate({
    inputRange: [0, 1],
    outputRange: [`${fromDeg}, ${origin}`, `${toDeg}, ${origin}`],
  });
}

export interface PixelPlantProps {
  size?: number;
  style?: ViewStyle;
}

export default function PixelPlant({ size = 160, style }: PixelPlantProps) {
  const leftRotation = useSway(LEAVES.left);
  const centerRotation = useSway(LEAVES.center);
  const rightRotation = useSway(LEAVES.right);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 500 500">
        <Path
          d="M199,284 L199,289 L198,290 L169,290 L169,295 L168,296 L163,296 L163,307 L168,307 L169,308 L169,325 L174,325 L175,326 L175,331 L180,331 L181,332 L181,361 L186,361 L187,362 L187,373 L192,373 L193,374 L193,379 L198,379 L199,380 L199,397 L307,397 L307,392 L308,391 L313,391 L313,386 L308,386 L307,385 L307,380 L308,379 L313,379 L313,374 L314,373 L319,373 L319,362 L320,361 L325,361 L325,332 L326,331 L331,331 L331,326 L332,325 L337,325 L337,320 L338,319 L343,319 L343,296 L338,296 L337,295 L337,290 L308,290 L307,289 L307,284 Z"
          fill="#832727"
          stroke="#211f1c"
          strokeWidth={4}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <Path d="M266,320 L266,325 L265,326 L175,326 L175,331 L192,331 L193,332 L193,337 L198,337 L198,332 L199,331 L331,331 L331,320 L284,320 L284,325 L283,326 L278,326 L277,325 L277,320 Z M199,284 L199,289 L271,289 L272,290 L272,295 L277,295 L277,290 L278,289 L307,289 L307,284 Z M320,344 L320,355 L325,355 L325,344 Z" fill="#5c1717" />
        <Path d="M187,344 L187,355 L186,356 L181,356 L181,361 L192,361 L193,362 L193,379 L198,379 L199,380 L199,391 L210,391 L210,380 L211,379 L228,379 L229,380 L229,391 L234,391 L234,386 L235,385 L240,385 L240,380 L235,380 L234,379 L234,374 L223,374 L222,373 L222,362 L223,361 L228,361 L229,362 L229,367 L234,367 L234,362 L229,362 L228,361 L228,350 L223,350 L222,349 L222,344 L199,344 L199,349 L198,350 L193,350 L192,349 L192,344 Z M169,290 L169,319 L174,319 L175,320 L175,325 L198,325 L198,320 L199,319 L204,319 L205,320 L205,325 L210,325 L210,320 L211,319 L216,319 L216,314 L217,313 L222,313 L222,308 L217,308 L216,307 L216,296 L211,296 L210,295 L210,290 L205,290 L205,301 L204,302 L199,302 L198,301 L198,290 Z M247,374 L247,385 L253,385 L254,386 L254,391 L259,391 L259,386 L260,385 L265,385 L265,380 L254,380 L253,379 L253,374 Z M247,362 L247,367 L265,367 L265,362 Z M278,350 L278,367 L283,367 L283,350 Z M247,296 L247,307 L253,307 L253,296 Z" fill="#a43737" />

        <AnimatedG rotation={leftRotation}>
          <Path
            d="M169,199 L169,228 L174,228 L175,229 L175,246 L180,246 L181,247 L181,259 L186,259 L187,260 L187,265 L192,265 L193,266 L193,271 L198,271 L199,272 L199,277 L204,277 L205,278 L205,283 L215,283 L215,223 L211,223 L210,222 L210,217 L205,217 L204,216 L204,211 L199,211 L198,210 L198,205 L193,205 L192,204 L192,199 Z"
            fill="#346923"
            stroke="#211f1c"
            strokeWidth={4}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <Path d="M169,199 L169,228 L174,228 L175,229 L175,240 L180,240 L181,241 L181,253 L192,253 L192,229 L193,228 L198,228 L198,223 L199,222 L204,222 L205,223 L205,228 L215,228 L215,223 L205,223 L204,222 L204,211 L199,211 L198,210 L198,205 L193,205 L192,204 L192,199 Z M205,235 L205,240 L210,240 L210,235 Z" fill="#519939" />
        </AnimatedG>

        <AnimatedG rotation={centerRotation}>
          <Path
            d="M247,157 L247,168 L246,169 L241,169 L241,174 L240,175 L235,175 L235,198 L234,199 L229,199 L229,222 L228,223 L223,223 L223,228 L222,229 L217,229 L216,228 L216,223 L216,283 L287,283 L287,229 L284,229 L283,228 L283,217 L278,217 L277,216 L277,193 L272,193 L271,192 L271,175 L266,175 L265,174 L265,169 L260,169 L259,168 L259,157 Z"
            fill="#346923"
            stroke="#211f1c"
            strokeWidth={4}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <Path d="M247,157 L247,174 L246,175 L235,175 L235,180 L240,180 L241,181 L241,192 L240,193 L235,193 L235,198 L234,199 L229,199 L229,228 L240,228 L240,217 L241,216 L246,216 L246,199 L247,198 L253,198 L254,199 L254,204 L259,204 L260,205 L260,216 L265,216 L266,217 L266,222 L277,222 L277,199 L272,199 L271,198 L271,175 L260,175 L259,174 L259,157 Z M247,235 L247,246 L253,246 L253,235 Z M284,235 L284,246 L287,246 L287,235 Z M254,266 L254,271 L259,271 L259,266 Z" fill="#519939" />
        </AnimatedG>

        <AnimatedG rotation={rightRotation}>
          <Path
            d="M314,199 L314,204 L313,205 L308,205 L308,210 L307,211 L302,211 L302,216 L301,217 L296,217 L296,222 L295,223 L290,223 L290,228 L289,229 L288,229 L288,283 L301,283 L301,278 L302,277 L307,277 L307,272 L308,271 L313,271 L313,266 L314,265 L319,265 L319,260 L320,259 L325,259 L325,247 L326,246 L331,246 L331,229 L332,228 L337,228 L337,199 Z"
            fill="#346923"
            stroke="#211f1c"
            strokeWidth={4}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <Path d="M314,199 L314,204 L313,205 L308,205 L308,210 L307,211 L302,211 L302,222 L301,223 L290,223 L290,234 L289,235 L288,235 L288,246 L301,246 L301,229 L302,228 L307,228 L308,229 L308,240 L313,240 L313,235 L314,234 L331,234 L331,229 L332,228 L337,228 L337,199 Z" fill="#519939" />
        </AnimatedG>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
