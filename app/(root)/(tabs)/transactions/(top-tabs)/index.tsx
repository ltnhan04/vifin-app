import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import {
  useRecentTransactionQuery,
  useGetTransactionByWeekQuery,
} from "@/redux/features/transaction/transactionApi";
import Loading from "@/app/loading";
import { useAppSelector } from "@/redux/hooks";
import androidSafeArea from "@/utils/android-safe-area";
import BarCharVisualize from "@/components/ui/BarChartVisualize";
import { ITransactionType } from "@/types/transaction";
import RecentTransactionItem from "@/components/ui/RecentTransactionItem";

const ThisWeek = () => {
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const transactionType = useAppSelector(
    (state) => state.transaction.selectedTransaction
  );
  const { data: recentTransactions, isFetching: isFetchingRecent } =
    useRecentTransactionQuery(
      { walletId: walletId as string, limit: 10 },
      { skip: !walletId, refetchOnMountOrArgChange: true }
    );

  const { data: transactionsByWeek, isFetching: isFetchingWeek } =
    useGetTransactionByWeekQuery(
      { walletId: walletId as string, type: transactionType?.value as string },
      { skip: !walletId || !transactionType }
    );

  const isLoading = isFetchingRecent || isFetchingWeek;
  if (isLoading) {
    return <Loading />;
  }

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
              <BarCharVisualize
                timeRange="week"
                transactionType={transactionType as ITransactionType}
                transactions={transactionsByWeek}
              />
            </ScrollView>
          </View>
        ) : (
          <Text className="text-white text-center mt-4">
            No transactions for this week
          </Text>
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
            <Text className="text-white text-center mt-2">
              No recent transactions
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisWeek;
