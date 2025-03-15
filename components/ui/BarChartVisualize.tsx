import { Text } from "react-native";
import React, { useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { formatChartDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import { getBarColor } from "@/utils/get-color";
import {
  IResponseTransactionByDay,
  IResponseTransactionByMonth,
  IResponseTransactionByYear,
  ITransactionType,
} from "@/types/transaction";

const BarCharVisualize = ({
  transactions,
  transactionType,
  timeRange,
}: {
  transactions:
    | IResponseTransactionByDay
    | IResponseTransactionByMonth
    | IResponseTransactionByYear;
  transactionType: ITransactionType;
  timeRange: "week" | "month" | "year";
}) => {
  const { barColor, gradientColor } = getBarColor(
    transactionType?.value as string
  );
  const [indexBar, setIndexBar] = useState(0);
  console.log(transactions.data, timeRange);

  const transactionData =
    transactions?.data[
      timeRange === "week"
        ? "transactionsByDay"
        : timeRange === "month"
          ? "transactionsByMonth"
          : "transactionsByYear"
    ] || [];
  return (
    <BarChart
      data={transactionData.map((item: { total: number; date: string }) => {
        return {
          value: item.total,
          label: formatChartDate(new Date(item.date), timeRange),
          frontColor: barColor,
          topLabelComponent: () => (
            <Text className="text-white text-[12px] font-bold text-center mb-1">
              {formatCurrency(item.total, "VND")}
            </Text>
          ),
        };
      })}
      isAnimated
      barWidth={50}
      spacing={20}
      showYAxisIndices
      yAxisThickness={0.4}
      xAxisThickness={1}
      maxValue={(transactions?.data.totalAmount || 100000) * 1.2}
      height={280}
      barBorderRadius={6}
      noOfSections={4}
      yAxisTextStyle={{ color: "white", fontSize: 12 }}
      xAxisLabelTextStyle={{ color: "white", fontSize: 12 }}
      yAxisColor={"#6BBFFF"}
      xAxisColor={"#6BBFFF"}
      showGradient
      gradientColor={gradientColor}
      rulesColor={"#6BBFFF"}
      onPress={setIndexBar}
      activeOpacity={0.8}
    />
  );
};

export default BarCharVisualize;
