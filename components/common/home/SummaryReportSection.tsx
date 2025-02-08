import { View, Text, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import TopItem from "@/components/ui/TopItem";
import SwitchTab from "@/components/ui/SwitchSelector";
import icons from "@/constants/icons";
import { formatCurrency } from "@/utils/format-currency";

type ReportProps = {
  type: "expense" | "income";
};

const SummaryReportSection: React.FC<ReportProps> = ({ type }) => {
  return (
    <View className="px-6 py-4 mt-6 border border-primary-brightBlue rounded-xl">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={icons.moneyWings}
            resizeMode="contain"
            className="size-8"
          />
          <Text className="font-rubik-medium text-lg text-secondary-yellow ml-2">
            {type === "expense" ? "Spending" : "Income"} Report
          </Text>
        </View>
        <Text className="font-rubik-light text-primary-brighterBlue text-sm">
          See Reports
        </Text>
      </View>
      <View className="mt-3">
        <SwitchTab item={["Week", "Month"]} />
        <View className="mt-4">
          <Text className="text-white text-2xl font-rubik-bold">
            {formatCurrency(250000, "VND")}
          </Text>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-rubik-medium text-white text-sm">
              Total {type === "expense" ? "spent" : "income"} of this week
            </Text>
            <View className="flex flex-row items-center gap-x-1">
              <Icon
                name={`arrow-down-circle-outline`}
                size={24}
                color={"#6BBFFF"}
              />
              <Text className="text-primary-brighterBlue text-sm">15%</Text>
            </View>
          </View>
        </View>
        <View className="mt-2">
          <Text className="text-xl text-primary-brighterBlue font-rubik-medium">
            Top {type === "expense" ? "Spending" : "Income"}
          </Text>
          <TopItem
            type={type}
            avt="foodBeverage"
            title="Food & Beverage"
            price={550000}
            percent={70}
          />
          <TopItem
            type={type}
            avt="shopping"
            title="Shopping"
            price={250000}
            percent={20}
          />
          <TopItem
            type={type}
            avt="transportation"
            title="Transportation"
            price={100000}
            percent={10}
          />
        </View>
      </View>
    </View>
  );
};

export default SummaryReportSection;
