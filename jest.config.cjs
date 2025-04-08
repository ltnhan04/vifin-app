module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native-modal-datetime-picker|react-native-radio-buttons-group|redux-mock-store|react-redux|react-native-gifted-charts|@react-native-segmented-control/segmented-control|expo-constants|expo-asset|expo-font|react-native-css-interop|react-native-paper|gifted-charts-core|react-native-linear-gradient|expo-linear-gradient|expo|expo-modules-core|react-native|expo-router|react-hook-form|@react-native-firebase/auth|@react-native-firebase|@react-native|react-native-vector-icons|@react-navigation|@expo/vector-icons)/.*)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^react-native-linear-gradient$":
      "<rootDir>/__mocks__/react-native-linear-gradient.js",
    "^expo-linear-gradient$":
      "<rootDir>/__mocks__/react-native-linear-gradient.js",
    "^react-native/Libraries/Animated/src/NativeAnimatedHelper$":
      "<rootDir>/__mocks__/NativeAnimatedHelper.js",
    "^expo-font$": "<rootDir>/__mocks__/expo-font.js",
    "^@react-native-firebase/auth$":
      "<rootDir>/__mocks__/@react-native-firebase/auth.js",
    "^expo-router$": "<rootDir>/__mocks__/expo-router.js",
    "^@react-native-google-signin/google-signin$":
      "<rootDir>/__mocks__/google-signin.js",
    "^react-native-radio-buttons-group$":
      "<rootDir>/__mocks__/react-native-radio-buttons-group.js",
    "^@react-native-async-storage/async-storage$":
      "<rootDir>/__mocks__/@react-native-async-storage/async-storage.js",
  },
  fakeTimers: {
    enableGlobally: true,
  },
};
