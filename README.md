# PlantTracker

A pixel-art themed plant care app built with React Native and Expo. Track your houseplants, get watering reminders, and enjoy a retro 8-bit aesthetic.

## Features

- **Plant Management** — Add, view, and remove plants with custom names, species, and icons
- **Watering Tracker** — Visual progress gauge that fills from green to terracotta as watering day approaches
- **Push Notifications** — Local reminders when a plant needs water
- **Days Ago Selector** — Adjust when a plant was last watered with a +/- pixel button
- **Animated Pixel Plant** — SVG plant with leaves that sway pixel-by-pixel
- **Pixel Art UI** — Hard shadow buttons, VT323/Silkscreen fonts, flat colors, no rounded corners
- **Background Animation** — Minecraft-style pixel grid that blinks in green, yellow, and brown

## Tech Stack

- **Expo SDK 54** with Expo Router (file-based routing)
- **React Native 0.81** with TypeScript
- **Zustand** + AsyncStorage for persistent state
- **expo-notifications** for local watering reminders
- **react-native-svg** for plant icons and animated leaf component
- **react-native-reanimated** for animations

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## Project Structure

```
PlantTracker/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout, fonts, notifications setup
│   ├── index.tsx           # Home screen — plant list + background
│   ├── add.tsx             # Add plant modal — icon picker, interval selector
│   └── plant/[id].tsx      # Plant detail — stats, water button, days ago picker
├── src/
│   ├── components/
│   │   ├── Pixel.tsx       # PixelButton + PixelPanel (hard shadow UI primitives)
│   │   ├── PlantCard.tsx   # List card with water ring + quick water button
│   │   ├── WaterRing.tsx   # Square progress gauge that fills from bottom
│   │   ├── EmptyState.tsx  # Empty list state with hint
│   │   ├── PixelPlant.tsx  # Animated SVG plant with swaying leaves
│   │   └── BackgroundAbsolute.tsx  # Blinking pixel grid background
│   ├── store/
│   │   └── usePlantStore.ts  # Zustand store — plants, water, notifications
│   ├── types/
│   │   └── plant.ts        # Plant + PlantIcon types
│   ├── data/
│   │   └── samplePlants.ts # Starter plants
│   ├── theme/
│   │   ├── colors.ts       # Color tokens + pixel metrics
│   │   └── typography.ts   # Font scale (Silkscreen display, VT323 body)
│   └── utils/
│       ├── plantIcons.tsx  # Plant icon images + component
│       ├── dateHelpers.ts  # Watering progress, status labels, formatting
│       └── notifications.ts # Notification scheduling + permissions
└── assets/
    └── images/             # Plant icon PNGs (monstera, cactus, fern, etc.)
```

## Design System

All UI follows pixel-art rules:

- **No border radius** — everything is sharp rectangles
- **Hard shadows** — solid offset blocks behind buttons and panels (no blur)
- **Flat colors** — no gradients, no opacity shadows
- **Fonts** — Silkscreen (display/buttons), VT323 (body text)
- **Border width** — always 3px

## License

MIT
