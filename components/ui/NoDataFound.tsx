import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const NoDataFound = ({ screenWidth }: { screenWidth: number }) => {
  return (
    <View
      className="w-full h-64 flex items-center justify-center"
      style={{ minWidth: screenWidth - 70 }}
    >
      <Icon name="bar-chart-outline" size={60} color="#6BBFFF" />
      <Text className="text-gray-300 text-xl font-medium mt-2">
        No Data Found
      </Text>
      <Text className="text-gray-400 text-base mt-1">
        Add income or expenses to view the chart.
      </Text>
    </View>
  );
};

export default NoDataFound;
