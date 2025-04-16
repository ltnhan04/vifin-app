import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { toast } from "sonner-native";
import { router } from "expo-router";
import { useDeleteTransactionMutation } from "@/redux/features/transaction/transactionApi";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { ITransaction } from "@/types/transaction";
import icons from "@/constants/icons";

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
              toast.success("Transaction deleted", {
                description: "It's been removed from your history.",
              });
            } catch (error) {
              console.error("Delete Transaction Error:", error);
              toast.error("Failed to delete transaction", {
                description: "Please try again later.",
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
      className="p-4 rounded-xl mb-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <View className="flex-row items-center">
        <View className="mr-3">
          <View
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor:
                transaction.transaction_type === "income"
                  ? "rgba(76, 175, 80, 0.2)"
                  : "rgba(244, 67, 54, 0.2)",
              borderWidth: 1,
              borderColor:
                transaction.transaction_type === "income"
                  ? "rgba(76, 175, 80, 0.3)"
                  : "rgba(244, 67, 54, 0.3)",
            }}
          >
            <Image
              source={{ uri: transaction.category.symbol as string }}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="flex-1 mr-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text
                className="text-white font-bold text-base"
                numberOfLines={1}
              >
                {transaction.category.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Image
                  source={icons.wallet}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  resizeMode="contain"
                />
                <Text
                  className="text-white font-medium text-sm ml-1"
                  numberOfLines={1}
                >
                  {transaction.wallet.wallet_name}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text
                className="text-base font-bold"
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
              <View className="flex-row items-center mt-1 font-medium">
                <Icon name="time-outline" size={16} color="white" />
                <Text className="text-white text-xs ml-1">
                  {formatDate(new Date(transaction.createdAt._seconds * 1000))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-col gap-y-2">
          <TouchableOpacity
            onPress={() =>
              router.push(`/transactions/modal/${transaction?._id}`)
            }
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            style={{
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            <Icon name="create-outline" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="w-8 h-8 rounded-full bg-[#F44336]/20 flex items-center justify-center"
            style={{
              borderWidth: 1,
              borderColor: "rgba(244,67,54,0.3)",
            }}
          >
            <Icon name="trash-outline" size={16} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

export default RecentTransactionItem;
