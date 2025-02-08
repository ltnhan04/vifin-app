import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TotalBalancesSection from "@/components/common/home/TotalBalancesSection";
import MyWalletSection from "@/components/common/home/MyWalletSection";
import SummaryReportSection from "@/components/common/home/SummaryReportSection";
import TargetProgressSection from "@/components/common/home/TargetProgressSection";
import CategoriesDetail from "@/components/common/home/CategoriesDetail";

const HomeScreen = () => {
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
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerClassName="px-6 pb-6">
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
            snapPoints={["25%", "50%", "75%", "100%"]}
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
