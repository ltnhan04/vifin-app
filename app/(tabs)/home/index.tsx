import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useRef, useCallback, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";

import TotalBalancesSection from "@/components/common/home/TotalBalancesSection";
import MyWalletSection from "@/components/common/home/MyWalletSection";
import SummaryReportSection from "@/components/common/home/SummaryReportSection";
import TargetProgressSection from "@/components/common/home/TargetProgressSection";
import CategoriesDetail from "@/components/common/home/CategoriesDetail";

const HomeScreen = () => {
  const { user } = useAppSelector((state) => state.auth);
  const bottomRef = useRef<BottomSheet>(null);
  const [selectCategory, setSelectCategory] = useState<
    "income" | "expense" | undefined
  >(undefined);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={3}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
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
                  <Text className="font-rubik-bold">, {user?.displayName}</Text>
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
            <SummaryReportSection
              type={"expense"}
              handleOpenBottomSheet={() => bottomRef.current?.expand()}
              handleSelectCategory={setSelectCategory}
            />
            <SummaryReportSection
              type={"income"}
              handleOpenBottomSheet={() => bottomRef.current?.expand()}
              handleSelectCategory={setSelectCategory}
            />
            <TargetProgressSection />
          </ScrollView>
          <BottomSheet
            ref={bottomRef}
            snapPoints={["25%", "50%", "75%", "90%"]}
            index={3}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
          >
            <BottomSheetView
              style={{
                flex: 1,
                paddingHorizontal: 24,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <View className="flex flex-row items-center justify-between w-full">
                <TouchableOpacity
                  onPress={() => bottomRef.current?.close()}
                  className="w-[35%]"
                >
                  <Text className="text-base font-medium">Cancel</Text>
                </TouchableOpacity>
                <Text className="w-[65%] text-left font-semibold text-black text-xl">
                  {selectCategory === "expense"
                    ? "Expense Details"
                    : "Income Details"}
                </Text>
              </View>
              <CategoriesDetail type={selectCategory} />
            </BottomSheetView>
          </BottomSheet>
        </LinearGradient>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
