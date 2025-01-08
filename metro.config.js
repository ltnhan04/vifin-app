const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

process.env.EXPO_ROUTER_APP_ROOT = process.env.EXPO_ROUTER_APP_ROOT || ".";

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(config, { input: "./app/global.css" });
