import { View, Text } from "react-native";
import React from "react";

const LegendSection = ({ textColor }: { textColor?: string }) => {
  return (
    <View className="flex-row justify-center gap-x-10 my-4">
      <View className="flex-row items-center gap-x-2">
        <View className="w-4 h-4 rounded-full bg-emerald-400" />
        <Text
          className={`${textColor ? `text-[${textColor}]` : "text-white"}  text-sm font-medium`}
        >
          Income
        </Text>
      </View>
      <View className="flex-row items-center gap-x-2">
        <View className="w-4 h-4 rounded-full bg-rose-400" />
        <Text
          className={`${textColor ? `text-[${textColor}]` : "text-white"}  text-sm font-medium`}
        >
          Expense
        </Text>
      </View>
    </View>
  );
};

export default LegendSection;
