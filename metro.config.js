// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Force Metro to resolve the CommonJS build of packages (like Zustand v5)
// instead of their ESM build, which uses `import.meta` and breaks on web.
config.resolver.unstable_conditionNames = ['require', 'react-native'];

module.exports = config;