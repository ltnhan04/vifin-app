import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import BudgetProgress from "@/components/ui/BudgetProgress";

const ThisYearScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerClassName="p-6 min-h-screen bg-white"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <BudgetProgress spent={70000} limit={100000} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisYearScreen;
