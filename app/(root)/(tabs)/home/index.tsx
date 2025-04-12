import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";
import React, { useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";
import MyWalletSection from "@/components/common/home/MyWalletSection";
import SummaryReportSection from "@/components/common/home/SummaryReportSection";
import TargetProgressSection from "@/components/common/home/TargetProgressSection";
import BottomStatistics from "@/components/common/home/BottomStatistics";

const HomeScreen = () => {
  const { user } = useAppSelector((state) => state.auth);
  const bottomRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
          <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerClassName="px-6 pb-6">
              <View className="flex flex-row items-center justify-between my-6">
                <View className="flex flex-row items-center">
                  <Image
                    source={icons.hello}
                    className="size-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white font-rubik-medium text-xl ml-2">
                    Welcome to{" "}
                    <Text className="text-primary-brightBlue">ViFin</Text>
                    <Text className="font-rubik-bold">, {user?.full_name}</Text>
                  </Text>
                </View>
                <Image
                  source={icons.bell}
                  resizeMode="contain"
                  className="size-7"
                />
              </View>
              <MyWalletSection />
              <SummaryReportSection
                handleOpenBottomSheet={() => bottomRef.current?.expand()}
              />
              <TargetProgressSection />
            </ScrollView>
            <BottomStatistics bottomRef={bottomRef} />
          </LinearGradient>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
