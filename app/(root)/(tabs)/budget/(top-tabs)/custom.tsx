import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { useGetBudgetByRepeatTypeQuery } from "@/redux/features/budget/budgetApi";
import { useAppSelector } from "@/redux/hooks";
import BudgetProgress from "@/components/ui/BudgetProgress";
import Loading from "@/app/loading";

const CustomScreen = () => {
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  const { data, isLoading, isFetching } = useGetBudgetByRepeatTypeQuery(
    {
      walletId: walletId as string,
      repeat_type: "custom",
    },
    { skip: !walletId }
  );

  const filteredData = data?.data?.filter((budget) => {
    if (filterCompleted === null) return true;
    return budget.is_completed === filterCompleted;
  }) || [];

  if (isFetching || isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-white">
        <View className="flex-row justify-center space-x-2 py-3 px-4 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => setFilterCompleted(null)}
            className={`flex-1 py-2 rounded-full items-center ${
              filterCompleted === null ? "bg-indigo-100" : "bg-gray-50"
            }`}
          >
            <Text className={`text-sm font-medium ${
              filterCompleted === null ? "text-indigo-600" : "text-gray-500"
            }`}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterCompleted(true)}
            className={`flex-1 py-2 rounded-full items-center ${
              filterCompleted === true ? "bg-emerald-100" : "bg-gray-50"
            }`}
          >
            <Text className={`text-sm font-medium ${
              filterCompleted === true ? "text-emerald-600" : "text-gray-500"
            }`}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterCompleted(false)}
            className={`flex-1 py-2 rounded-full items-center ${
              filterCompleted === false ? "bg-rose-100" : "bg-gray-50"
            }`}
          >
            <Text className={`text-sm font-medium ${
              filterCompleted === false ? "text-rose-600" : "text-gray-500"
            }`}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerClassName="p-4 min-h-screen bg-white"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <BudgetProgress budgetData={filteredData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomScreen;
