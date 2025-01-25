import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import Badge from "@/components/ui/Badge";
import { getColorForValue } from "@/utils/get-color";

const TargetItem = ({ percentage }: { percentage: number }) => {
  const pieData = [
    {
      value: percentage,
      color: getColorForValue(percentage),
    },
    {
      value: 100 - percentage,
      color: "#D3D3D3",
    },
  ];
  return (
    <View className="flex flex-row items-center gap-x-4 mt-4">
      <View className="">
        <PieChart
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
            3.000.000 / 4.000.000 VND
          </Text>
          <Text
            className="text-xs font-rubik-medium"
            style={{ color: getColorForValue(percentage) }}
          >
            1.000.000 VND Left
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
