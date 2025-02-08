import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import androidSafeArea from "@/utils/android-safe-area";

const ThisMonth = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <View>
        <Text>ThisWeek</Text>
      </View>
    </SafeAreaView>
  );
};

export default ThisMonth;
