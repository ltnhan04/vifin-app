import { SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { useGetBudgetByRepeatTypeQuery } from "@/redux/features/budget/budgetApi";
import { useAppSelector } from "@/redux/hooks";
import BudgetProgress from "@/components/ui/BudgetProgress";
import Loading from "@/app/loading";

const ThisMonthScreen = () => {
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const { data, isLoading, isFetching } = useGetBudgetByRepeatTypeQuery(
    {
      walletId: walletId as string,
      repeat_type: "monthly",
    },
    { skip: !walletId }
  );
  if (isFetching || isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerClassName="p-6 min-h-screen bg-white"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <BudgetProgress budgetData={data?.data || []} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisMonthScreen;
