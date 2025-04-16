import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { getColorForValue, lightenColor } from "@/utils/get-color";
import { formatCurrency } from "@/utils/format-currency";
import BudgetData from "@/components/common/budget/BudgetData";
import NewLimitBtn from "@/components/common/budget/NewLimitBtn";
import ExpenseData from "@/components/common/budget/ExpenseData";
import { IBudgetByRepeatType } from "@/types/budget";
import NoBudget from "@/components/ui/NoBudget";
import { calculateBudget } from "@/utils/calculate";

const BudgetProgress = ({
  budgetData = [],
}: {
  budgetData: IBudgetByRepeatType[];
}) => {
  if (!budgetData || budgetData.length === 0) {
    return <NoBudget />;
  }
  const { totalLimit, totalSpent, percentage } = calculateBudget(budgetData);
  const chartColor = getColorForValue(percentage);
  const getTextColor = () => {
    if (percentage > 75) return "#B91C1C";
    if (percentage < 30) return "#15803D";
    return "#D97706";
  };

  return (
    <View className="flex flex-col items-center justify-center w-full">
      <PieChart
        semiCircle
        radius={140}
        showGradient
        innerRadius={120}
        data={[
          { value: percentage, color: chartColor },
          { value: 100 - percentage, color: lightenColor(chartColor, 35) },
        ]}
        centerLabelComponent={() => (
          <View className="flex flex-col items-center">
            <Text
              className="font-rubik-medium text-2xl"
              style={{ color: getTextColor() }}
            >
              Total Spending
            </Text>
            <Text
              className="font-rubik-bold text-lg mt-1"
              style={{ color: getTextColor() }}
            >
              {formatCurrency(totalSpent, "VND")}
            </Text>
          </View>
        )}
      />
      <View className="flex flex-row items-center justify-between w-full px-2 mt-4">
        <BudgetData
          title="Budget"
          primaryColor={getTextColor()}
          amount={totalLimit}
        />
        <BudgetData
          title="Remain money"
          primaryColor={getTextColor()}
          amount={totalLimit - totalSpent}
        />
      </View>
      <View className="flex flex-row justify-end w-full">
        <NewLimitBtn bgColor={chartColor} />
      </View>
      <View className="w-full mt-4 flex flex-col gap-y-2">
        {budgetData.map((budget) => (
          <ExpenseData
            key={budget._id}
            budgetId={budget._id as string}
            currentAmount={budget.usage}
            goalAmount={budget.amount}
            categoryName={budget.category.name}
            dueDate={budget.dueDate}
            symbol={budget.category.symbol}
          />
        ))}
      </View>
    </View>
  );
};

export default BudgetProgress;
