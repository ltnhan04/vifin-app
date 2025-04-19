import { View, Text, Image } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { BlurView } from "expo-blur";
import { getColorForValue, lightenColor } from "@/utils/get-color";
import { formatCurrency } from "@/utils/format-currency";
import { formatDueDate } from "@/utils/format-date";
import { calculateExpense } from "@/utils/calculate";
import { DueDate } from "@/types/budget";

interface TargetItemProps {
  categoryName: string;
  amount: number;
  usage: number;
  date: DueDate;
  image: string;
}

const TargetItem: React.FC<TargetItemProps> = ({
  categoryName,
  amount,
  date,
  usage,
  image,
}) => {
  const { percentage, remainingAmount } = calculateExpense(amount, usage);
  const pieData = [
    {
      value: percentage,
      color: getColorForValue(percentage),
    },
    {
      value: 100 - percentage,
      color: lightenColor(getColorForValue(percentage), 35),
    },
  ];

  return (
    <BlurView
      intensity={20}
      tint="systemMaterialDark"
      className="overflow-hidden rounded-xl mb-3"
    >
      <View className="p-4 border border-primary-brightBlue rounded-xl">
        <View className="flex flex-row items-center justify-between mb-3">
          <View className="flex flex-row items-center gap-x-3">
            <Image
              source={{ uri: image }}
              className="size-12 rounded-full bg-primary-brightBlue"
            />
            <View>
              <Text className="text-base font-rubik-extrabold text-white">
                {categoryName}
              </Text>
              <Text className="text-xs font-rubik-medium text-gray-400">
                {formatDueDate(date)}
              </Text>
            </View>
          </View>
          <View>
            <PieChart
              isAnimated
              donut
              radius={25}
              innerRadius={15}
              data={pieData}
              centerLabelComponent={() => (
                <Text className="text-primary-dark font-medium text-xs">
                  {percentage}%
                </Text>
              )}
            />
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex flex-row items-center gap-x-2 mb-1">
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getColorForValue(percentage) }}
              />
              <Text className="text-xs font-rubik-medium text-gray-300">
                Spent: {formatCurrency(usage, "VND")}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: lightenColor(
                    getColorForValue(percentage),
                    35
                  ),
                }}
              />
              <Text className="text-xs font-rubik-medium text-gray-300">
                Remaining: {formatCurrency(remainingAmount, "VND")}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-xs font-rubik-medium text-white">Total</Text>
            <Text className="text-sm font-rubik-bold text-white">
              {formatCurrency(amount, "VND")}
            </Text>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default TargetItem;
