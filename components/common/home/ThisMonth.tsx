import androidSafeArea from "@/utils/android-safe-area";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BarChart } from "react-native-gifted-charts";
import { useAppSelector } from "@/redux/hooks";
import { useGetStatisticMonthlyQuery } from "@/redux/features/wallet/walletApi";
import NoDataFound from "@/components/ui/NoDataFound";
import { formatChartDate } from "@/utils/format-date";
import { formatValue } from "@/utils/format-currency";
import LegendSection from "@/components/ui/LegendSection";

const ThisMonth = () => {
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const { data: transactionsByMonth, isFetching } = useGetStatisticMonthlyQuery(
    { walletId: walletId as string },
    { skip: !walletId }
  );
  const screenWidth = Dimensions.get("window").width;

  const processChartData = () => {
    if (!transactionsByMonth?.data?.transactionsByMonth) {
      return [];
    }
    let maxAmount = 0;
    transactionsByMonth.data.transactionsByMonth.forEach((month) => {
      maxAmount = Math.max(maxAmount, month.totalIncome, month.totalExpense);
    });
    return transactionsByMonth.data.transactionsByMonth.map((item) => {
      const formattedDate = formatChartDate(new Date(item.month), "month");
      return {
        month: formattedDate,
        income: item.totalIncome,
        expense: item.totalExpense,
      };
    });
  };
  const chartData = processChartData();
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <View className="w-full flex items-center justify-center">
        <LegendSection textColor="#000" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isFetching ? (
          <View
            className="w-full h-64 flex items-center justify-center"
            style={{ minWidth: screenWidth - 70 }}
          >
            <ActivityIndicator size="large" color="#6BBFFF" />
            <Text className="text-white text-sm mt-2">Loading...</Text>
          </View>
        ) : chartData.length === 0 ? (
          <NoDataFound screenWidth={screenWidth} />
        ) : (
          <View
            style={{ width: Math.max(screenWidth, chartData.length * 100) }}
            className="flex flex-col items-center justify-center py-4"
          >
            <BarChart
              width={Math.max(screenWidth - 50, chartData.length * 100)}
              barWidth={40}
              noOfSections={8}
              barBorderRadius={6}
              spacing={4}
              formatYLabel={(value) => formatValue(Number(value))}
              data={chartData.flatMap((item) => [
                {
                  value: item.income,
                  frontColor: "#34D399",
                  barWidth: 50,
                  topLabelComponent: () => (
                    <View style={{ paddingBottom: 4 }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {item.income > 0 ? formatValue(item.income) : ""}
                      </Text>
                    </View>
                  ),
                  label: "",
                },
                {
                  value: item.expense,
                  frontColor: "#FB7185",
                  barWidth: 50,
                  topLabelComponent: () => (
                    <View style={{ paddingBottom: 4 }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {item.expense > 0 ? formatValue(item.expense) : ""}
                      </Text>
                    </View>
                  ),
                  label: item.month,
                  labelTextStyle: {
                    color: "black",
                    fontSize: 11,
                    textAlign: "center",
                    transform: [{ translateX: -24 }],
                  },
                },
              ])}
              xAxisThickness={1}
              yAxisThickness={1}
              xAxisColor="#D3D3D3"
              yAxisColor="#D3D3D3"
              yAxisTextStyle={{
                color: "black",
                fontSize: 12,
                fontWeight: "500",
              }}
              height={300}
              activeOpacity={0.7}
              isAnimated={false}
              maxValue={
                Math.ceil(
                  Math.max(
                    ...chartData.map((item) =>
                      Math.max(item.income, item.expense)
                    )
                  ) / 1000
                ) *
                1000 *
                1.2
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisMonth;
