import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { getColorForValue, lightenColor } from "@/utils/get-color";
import { formatCurrency } from "@/utils/format-currency";
import BudgetData from "@/components/common/budget/BudgetData";
import NewLimitBtn from "@/components/common/budget/NewLimitBtn";
import ExpenseData from "@/components/common/budget/ExpenseData";

const BudgetProgress = ({ spent, limit }: { spent: number; limit: number }) => {
  const percentage = (spent / limit) * 100;
  const chartColor = getColorForValue(percentage);

  const getTextColor = () => {
    if (percentage > 75) return "#B91C1C";
    if (percentage < 30) return "#15803D";
    return "#D97706";
  };

  return (
    <View className="w-full flex flex-col items-center justify-center">
      <PieChart
        semiCircle
        radius={180}
        showGradient
        innerRadius={120}
        data={[
          { value: percentage, color: chartColor },
          { value: 100 - percentage, color: lightenColor(chartColor, 35) },
        ]}
        centerLabelComponent={() => (
          <View className="flex flex-col items-center">
            <Text
              className="font-rubik-medium text-xl"
              style={{ color: getTextColor() }}
            >
              Total Spending
            </Text>
            <Text
              className="font-rubik-bold text-xl"
              style={{ color: getTextColor() }}
            >
              {formatCurrency(spent, "VND")}
            </Text>
          </View>
        )}
      />
      <View className="flex flex-row items-center gap-x-4 mt-4">
        <BudgetData
          title="Limit budget"
          primaryColor={getTextColor()}
          amount={limit}
        />
        <BudgetData
          title="Remain money"
          primaryColor={getTextColor()}
          amount={limit - spent}
        />
        <BudgetData title="Due day" primaryColor={getTextColor()} days="4" />
      </View>
      <View className="flex flex-row justify-end w-full">
        <NewLimitBtn bgColor={chartColor} />
      </View>
      <View className="w-full mt-4 flex flex-col gap-y-4">
        <ExpenseData currentAmount={500000} goalAmount={700000} />
        <ExpenseData currentAmount={90000} goalAmount={100000} />
      </View>
    </View>
  );
};

export default BudgetProgress;
