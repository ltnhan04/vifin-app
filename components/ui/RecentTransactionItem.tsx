import { View, Text, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { ITransaction } from "@/types/transaction";

const RecentTransactionItem = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  return (
    <BlurView
      intensity={30}
      tint="dark"
      className="flex-row items-center p-4 rounded-xl mb-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <Image
        source={{ uri: transaction.category.symbol }}
        style={{
          width: 50,
          height: 50,
          marginRight: 15,
          borderRadius: 25,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
        resizeMode="contain"
      />
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-white font-semibold text-lg">
            {transaction.category.name}
          </Text>
          <Text
            className="text-base font-extrabold"
            style={{
              color:
                transaction.transaction_type === "income"
                  ? "#4CAF50"
                  : "#F44336",
            }}
          >
            {transaction.transaction_type.toLocaleUpperCase()}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-gray-400 text-lg">
            {transaction.wallet.wallet_name}
          </Text>
          <Text
            className="text-lg font-semibold"
            style={{
              color:
                transaction.transaction_type === "income"
                  ? "#4CAF50"
                  : "#F44336",
            }}
          >
            {transaction.transaction_type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount, "VND")}
          </Text>
        </View>
        <Text className="text-gray-400 text-sm">
          {formatDate(new Date(transaction.createdAt._seconds * 1000))}
        </Text>
      </View>
    </BlurView>
  );
};

export default RecentTransactionItem;
