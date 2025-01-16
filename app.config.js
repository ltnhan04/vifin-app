export default {
  expo: {
    name: "ViFin: Finance Assist",
    slug: "vifin-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "vifin",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#081657",
    },
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nhanluong.vifinapp",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
      runtimeVersion: "1.0.0",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#081657",
      },
      package: "com.nhanluong.vifinapp",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#081657",
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Rubik-Bold.ttf",
            "./assets/fonts/Rubik-ExtraBold.ttf",
            "./assets/fonts/Rubik-Light.ttf",
            "./assets/fonts/Rubik-Medium.ttf",
            "./assets/fonts/Rubik-Regular.ttf",
            "./assets/fonts/Rubik-SemiBold.ttf",
          ],
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: true,
          },
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "bb50d400-ca3c-4de3-9551-b14dac5a3218",
      },
    },
    owner: "nhanluong",
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/bb50d400-ca3c-4de3-9551-b14dac5a3218",
    },
  },
};
