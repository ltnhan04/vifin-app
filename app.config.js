export default {
  expo: {
    name: "ViFin: Finance Assist",
    slug: "vifin-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "vifin",
    splash: {
      image: "./assets/images/adaptive-icon.png",
      resizeMode: "cover",
      backgroundColor: "#081657",
    },
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nhanluong.vifinapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_INFO_JSON,
    },
    android: {
      runtimeVersion: "1.0.0",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#081657",
      },
      softwareKeyboardLayoutMode: "pan",
      package: "com.nhanluong.vifinapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    doctor: {
      reactNativeDirectoryCheck: {
        exclude: ["@hookform/resolvers", "dotenv", "firebase", "tailwindcss"],
        listUnknownPackages: false,
      },
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://acme.com",
          asyncRoutes: {
            web: true,
            android: true,
            ios: true,
            default: "development",
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/adaptive-icon.png",
          resizeMode: "cover",
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
      "@config-plugins/ffmpeg-kit-react-native",
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
      url: `https://u.expo.dev/bb50d400-ca3c-4de3-9551-b14dac5a3218`,
    },
  },
};
