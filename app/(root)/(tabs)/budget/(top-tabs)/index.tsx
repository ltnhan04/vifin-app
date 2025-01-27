import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import androidSafeArea from "@/utils/android-safe-area";

const BudgetScreen = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerClassName="px-6 py-10"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text>BudgetScreen</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BudgetScreen;
