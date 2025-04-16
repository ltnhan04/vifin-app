import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";
import {
  useRecentTransactionQuery,
  useGetTransactionByYearQuery,
} from "@/redux/features/transaction/transactionApi";
import Loading from "@/app/loading";
import { useAppSelector } from "@/redux/hooks";
import androidSafeArea from "@/utils/android-safe-area";
import RecentTransactionItem from "@/components/ui/RecentTransactionItem";
import images from "@/constants/images";
import { formatChartDate } from "@/utils/format-date";
import { getBarColor } from "@/utils/get-color";
import { formatValue } from "@/utils/format-currency";
import { ITransaction } from "@/types/transaction";
import ModalDetailsTransaction from "@/components/common/transactions/ModalDetailsTransaction";
import AddTransactionButton from "@/components/common/transactions/AddTransactionButton";

const ThisYear = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBarData, setSelectedBarData] = useState<{
    total: number;
    transactions: ITransaction[];
  } | null>(null);

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
    }
  );
  useEffect(() => {
    if (walletId) {
      refetch();
    }
  }, [walletId, refetch]);

  const { data: transactionsByYear, isFetching: isFetchingYear } =
    useGetTransactionByYearQuery(
      { walletId: walletId as string, type: transactionType?.value as string },
      { skip: !walletId || !transactionType }
    );

  const isLoading = isFetchingRecent || isFetchingYear;
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
        {transactionsByYear &&
        transactionsByYear?.data?.transactionsByYear?.length > 0 ? (
          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={transactionsByYear.data.transactionsByYear.map(
                  (item: {
                    total: number;
                    year: string;
                    transactions: ITransaction[];
                  }) => {
                    return {
                      value: item.total,
                      label: formatChartDate(new Date(item.year), "year"),
                      frontColor: barColor,
                      topLabelComponent: () => (
                        <Text className="text-white text-[12px] font-bold text-center mb-1">
                          {formatValue(item.total)}
                        </Text>
                      ),
                      onPress: () => {
                        setSelectedBarData({
                          total: item.total,
                          transactions: item.transactions,
                        });
                        setOpenModal(true);
                      },
                    };
                  }
                )}
                isAnimated
                barWidth={36}
                spacing={20}
                showYAxisIndices
                yAxisThickness={0.4}
                xAxisThickness={1}
                formatYLabel={(value) => formatValue(Number(value))}
                maxValue={(transactionsByYear.data.totalAmount || 100000) * 1.2}
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
              No transactions for this year
            </Text>
          </View>
        )}

        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-white">
              Recent Transactions
            </Text>
            <AddTransactionButton />
          </View>
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
      {selectedBarData ? (
        <ModalDetailsTransaction
          modalVisible={openModal}
          setModalVisible={() => setOpenModal(false)}
          selectedBarData={selectedBarData}
        />
      ) : (
        ""
      )}
    </SafeAreaView>
  );
};

export default ThisYear;
