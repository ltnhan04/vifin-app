import { View, Text, Image } from "react-native";
import React from "react";
import { ProgressBar } from "react-native-paper";
import { formatCurrency } from "@/utils/format-currency";
import { getColorForValue } from "@/utils/get-color";
import icons from "@/constants/icons";

const ExpenseData = ({
  currentAmount,
  goalAmount,
}: {
  currentAmount: number;
  goalAmount: number;
}) => {
  const remainingAmount = goalAmount - currentAmount;
  const progress = currentAmount / goalAmount;
  const percentage = Math.round(progress * 100);

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
          source={icons.shopping}
          className="w-14 h-14 rounded-full bg-gray-200 p-2"
          resizeMode="contain"
        />
        <View className="flex-1 ml-3">
          <View className="flex flex-row justify-between items-center">
            <Text
              className="text-base font-semibold"
              style={{ color: getColorForValue(percentage) }}
            >
              Shopping
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Due day: 31/03/2024
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text
              className="text-xl font-bold "
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
              backgroundColor: "#f0f0f0",
            }}
          />
          <View className="flex-row justify-between mt-1">
            <Text
              className="text-sm "
              style={{ color: getColorForValue(percentage) }}
            >
              {percentage}%
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: getColorForValue(percentage) }}
            >
              {formatCurrency(remainingAmount, "VND")} left to reach the goal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseData;
