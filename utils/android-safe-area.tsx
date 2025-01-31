import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
});
