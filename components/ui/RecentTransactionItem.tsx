import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useDeleteTransactionMutation } from "@/redux/features/transaction/transactionApi";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { ITransaction } from "@/types/transaction";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const RecentTransactionItem = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction({
                id: transaction._id,
              }).unwrap();
              Toast.show({
                type: "success",
                text1: "Transaction deleted",
                text2: "It's been removed from your history.",
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Failed to delete transaction",
                text2: "Please try again later.",
              });
            }
          },
        },
      ]
    );
  };

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
      <View className="mr-4">
        <Image
          source={{ uri: transaction.category.symbol }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <Text className="text-white font-semibold text-xl" numberOfLines={1}>
          {transaction.category.name}
        </Text>

        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-400 text-xl" numberOfLines={1}>
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

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-gray-500 text-base font-bold">
            {formatDate(new Date(transaction.createdAt._seconds * 1000))}
          </Text>
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity
              onPress={() =>
                router.push(`/transactions/modal/${transaction?._id}`)
              }
            >
              <Icon name="create-outline" size={22} color="#FFD700" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="trash-outline" size={22} color="#FF4C4C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default RecentTransactionItem;
