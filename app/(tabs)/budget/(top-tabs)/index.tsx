import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import BudgetProgress from "@/components/ui/BudgetProgress";

const ThisWeekScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerClassName="p-6 min-h-screen bg-white"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <BudgetProgress spent={500000} limit={600000} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisWeekScreen;
