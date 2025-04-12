import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { ProgressBar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toast } from "sonner-native";
import { useDeleteBudgetMutation } from "@/redux/features/budget/budgetApi";
import { formatCurrency } from "@/utils/format-currency";
import { getColorForValue, lightenColor } from "@/utils/get-color";
import { DueDate } from "@/types/budget";
import { formatDueDate } from "@/utils/format-date";
import { calculateExpense } from "@/utils/calculate";
import { router } from "expo-router";

const ExpenseData = ({
  budgetId,
  currentAmount,
  goalAmount,
  categoryName,
  dueDate,
  symbol,
}: {
  currentAmount: number;
  goalAmount: number;
  categoryName: string;
  dueDate: DueDate;
  symbol: string;
  budgetId: string;
}) => {
  const { percentage, remainingAmount, progress } = calculateExpense(
    goalAmount,
    currentAmount
  );
  const [deleteBudget] = useDeleteBudgetMutation();

  const handleDelete = async () => {
    Alert.alert("Confirm", "Are you sure you want to delete this budget?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBudget({ id: budgetId });
            toast.success("Budget removed", {
              description: "Hope you’re adjusting your plan!",
            });
          } catch (error) {
            console.error("Delete Budget Error:", error);
            toast.error("Delete failed", {
              description: "Couldn’t remove this budget.",
            });
          }
        },
      },
    ]);
  };

  return (
    <View
      className="px-4 py-4 rounded-2xl bg-white border border-gray-200"
      style={{
        elevation: 5,
        shadowColor: "#d3d3d3",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: symbol }}
          className="w-14 h-14 rounded-full bg-gray-200 p-2"
          resizeMode="contain"
        />
        <View className="flex-1 ml-3">
          <View className="flex flex-row justify-between items-center">
            <Text
              className="text-base font-semibold"
              style={{ color: getColorForValue(percentage) }}
            >
              {categoryName}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Due: {formatDueDate(dueDate)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text
              className="text-xl font-bold"
              style={{ color: getColorForValue(percentage) }}
            >
              {formatCurrency(currentAmount, "VND")}
            </Text>
            <Text className="text-sm text-gray-500">
              Goal: {formatCurrency(goalAmount, "VND")}
            </Text>
          </View>
          <ProgressBar
            progress={progress}
            color={getColorForValue(percentage)}
            style={{
              height: 10,
              borderRadius: 5,
              marginTop: 8,
              backgroundColor: lightenColor(getColorForValue(percentage)),
            }}
          />
          <View className="flex-row justify-between mt-1">
            <Text
              className="text-sm"
              style={{ color: getColorForValue(percentage) }}
            >
              {percentage}%
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: getColorForValue(percentage) }}
            >
              {formatCurrency(remainingAmount, "VND")} left
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-center ml-4">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push(`/budget/modal/edit/${budgetId}`)}
            className="p-2 rounded-full bg-primary-brightBlue"
            style={{
              marginBottom: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="create-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleDelete}
            className="p-2 rounded-full bg-secondary-red"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="trash-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExpenseData;
