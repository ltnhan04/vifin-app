import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { formatCurrency } from "@/utils/format-currency";
import CollapsibleTransactionItem from "@/components/ui/CollapsibleTransactionItem";
import { transactionsData } from "@/constants/data";

const TransactionScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView contentContainerClassName="p-6">
          <View className="flex flex-row items-center w-full justify-between ">
            <Text className="text-white text-base font-semibold">
              Total expense this time:
            </Text>
            <Text className="text-white text-base font-bold">
              {formatCurrency(50000, "VND")}
            </Text>
          </View>
          <View className="mt-6">
            {transactionsData.map((item, index) => (
              <CollapsibleTransactionItem key={index} {...item} />
            ))}
            {transactionsData.map((item, index) => (
              <CollapsibleTransactionItem key={index} {...item} />
            ))}
            {transactionsData.map((item, index) => (
              <CollapsibleTransactionItem key={index} {...item} />
            ))}
            {transactionsData.map((item, index) => (
              <CollapsibleTransactionItem key={index} {...item} />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TransactionScreen;
