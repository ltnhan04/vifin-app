import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  useRecentTransactionQuery,
  useGetTransactionByWeekQuery,
} from "@/redux/features/transaction/transactionApi";
import Loading from "@/app/loading";
import { useAppSelector } from "@/redux/hooks";
import images from "@/constants/images";
import androidSafeArea from "@/utils/android-safe-area";
import RecentTransactionItem from "@/components/ui/RecentTransactionItem";
import { formatChartDate } from "@/utils/format-date";
import { BarChart } from "react-native-gifted-charts";
import { formatCurrency } from "@/utils/format-currency";
import { getBarColor } from "@/utils/get-color";

const ThisWeek = () => {
  const [indexBar, setIndexBar] = useState(0);
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const transactionType = useAppSelector(
    (state) => state.transaction.selectedTransaction
  );
  const {
    data: recentTransactions,
    isFetching: isFetchingRecent,
    refetch,
  } = useRecentTransactionQuery(
    {
      walletId: walletId as string,
      type: transactionType?.value as string,
      limit: 10,
    },
    {
      skip: !transactionType?.value,
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (walletId) {
      refetch();
    }
  }, [walletId, refetch]);
  const { data: transactionsByWeek, isFetching: isFetchingWeek } =
    useGetTransactionByWeekQuery(
      { walletId: walletId as string, type: transactionType?.value as string },
      { skip: !walletId || !transactionType }
    );

  const isLoading = isFetchingRecent || isFetchingWeek;
  if (isLoading) {
    return <Loading />;
  }

  const { barColor, gradientColor } = getBarColor(
    transactionType?.value as string
  );

  return (
    <SafeAreaView
      style={[
        androidSafeArea.androidSafeArea,
        { backgroundColor: "#081657", flex: 1 },
      ]}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {transactionsByWeek &&
        transactionsByWeek?.data?.transactionsByDay?.length > 0 ? (
          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={transactionsByWeek.data.transactionsByDay.map(
                  (item: { total: number; date: string }) => {
                    return {
                      value: item.total,
                      label: formatChartDate(new Date(item.date), "week"),
                      frontColor: barColor,
                      topLabelComponent: () => (
                        <Text className="text-white text-[12px] font-bold text-center mb-1">
                          {formatCurrency(item.total, "VND")}
                        </Text>
                      ),
                    };
                  }
                )}
                isAnimated
                barWidth={56}
                spacing={20}
                showYAxisIndices
                yAxisThickness={0.4}
                xAxisThickness={1}
                maxValue={(transactionsByWeek.data.totalAmount || 100000) * 1.2}
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
            </ScrollView>
          </View>
        ) : (
          <View className="flex flex-col items-center justify-center">
            <Image
              resizeMode="contain"
              className="w-64 h-64"
              source={images.noData}
            />
            <Text className="text-white text-center">
              No transactions for this week
            </Text>
          </View>
        )}

        <View className="mt-4">
          <Text className="text-xl font-bold text-white mb-4">
            Recent Transactions
          </Text>
          {recentTransactions && recentTransactions.data.length > 0 ? (
            recentTransactions.data.map((transaction, index) => (
              <RecentTransactionItem key={index} transaction={transaction} />
            ))
          ) : (
            <View className="flex flex-col items-center justify-center">
              <Image
                resizeMode="contain"
                className="w-64 h-64"
                source={images.noTransaction}
              />
              <Text className="text-white text-center">
                No recent transactions
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisWeek;
