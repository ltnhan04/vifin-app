import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import Badge from "@/components/ui/Badge";
import { getColorForValue, lightenColor } from "@/utils/get-color";
import { formatCurrency } from "@/utils/format-currency";

const TargetItem = ({ percentage }: { percentage: number }) => {
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
    <View className="flex flex-row items-center gap-x-4 mt-4">
      <View>
        <PieChart
          isAnimated
          donut
          radius={30}
          innerRadius={20}
          data={pieData}
          centerLabelComponent={() => (
            <Text className="text-black font-rubik-bold text-xs">
              {percentage}%
            </Text>
          )}
        />
      </View>
      <View className="flex gap-y-[6px]">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-base font-rubik-extrabold text-white">
            Vacations
          </Text>
          <Badge category="Shopping" bgColor={getColorForValue(percentage)} />
        </View>
        <View className="flex flex-row items-center gap-x-5">
          <Text className="text-white text-xs font-rubik-medium">
            {formatCurrency(3000000, "VND")} / {formatCurrency(4000000, "VND")}
          </Text>
          <Text
            className="text-xs font-rubik-medium"
            style={{ color: getColorForValue(percentage) }}
          >
            {formatCurrency(1000000, "VND")}
          </Text>
        </View>
        <Text className="text-white text-xs font-rubik-bold ">
          Goal will be completed on 3rd January, 2025
        </Text>
      </View>
    </View>
  );
};

export default TargetItem;
