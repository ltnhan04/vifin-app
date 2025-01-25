import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import icons from "@/constants/icons";
import androidSafeArea from "@/utils/android-safe-area";

import TotalBalancesSection from "@/components/common/home/TotalBalancesSection";
import MyWalletSection from "@/components/common/home/MyWalletSection";
import SummaryReportSection from "@/components/common/home/SummaryReportSection";
import TargetProgressSection from "@/components/common/home/TargetProgressSection";

const HomeScreen = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerClassName="px-6 py-10">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center">
              <Image
                source={icons.hello}
                className="size-8"
                resizeMode="contain"
              />
              <Text className="text-white font-rubik-medium text-xl ml-2">
                Welcome to{" "}
                <Text className="text-primary-brightBlue">ViFin</Text>
                <Text className="font-rubik-bold">, Nhan Luong</Text>
              </Text>
            </View>
            <Image
              source={icons.bell}
              resizeMode="contain"
              className="size-7"
            />
          </View>
          <TotalBalancesSection />
          <MyWalletSection />
          <SummaryReportSection type={"expense"} />
          <SummaryReportSection type={"income"} />
          <TargetProgressSection />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
