import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import { useAppDispatch } from "@/redux/hooks";
import {
  useGetWalletsQuery,
  useGetStatisticWeeklyQuery,
} from "@/redux/features/wallet/walletApi";
import { setSelectedWallet } from "@/redux/features/wallet/walletSlice";
import { setSelectedTransactionType } from "@/redux/features/transaction/transactionSlice";
import { IWallet } from "@/types/wallet";
import { ITransactionType } from "@/types/transaction";
import ModalDropdown from "@/components/ui/ModalDropdown";
import { formatChartDate } from "@/utils/format-date";
import { formatValue } from "@/utils/format-currency";
import LegendSection from "@/components/ui/LegendSection";
import NoDataFound from "@/components/ui/NoDataFound";

const SummaryReportSection = ({
  handleOpenBottomSheet,
}: {
  handleOpenBottomSheet: () => void;
}) => {
  const [dropdownType, setDropdownType] = useState<
    "wallet" | "transaction_type" | null
  >(null);
  const [walletData, setWalletData] = useState<IWallet | null>(null);
  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get("window").width;

  const {
    data: wallets,
    isLoading: isWalletLoading,
    isFetching: isWalletFetching,
  } = useGetWalletsQuery();

  const { data: transactionsByWeek, isFetching: isFetchingWeek } =
    useGetStatisticWeeklyQuery(
      { walletId: walletData?._id as string },
      { skip: !walletData, refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (wallets?.data?.length && !walletData) {
      const firstWallet = wallets.data[0];
      setWalletData(firstWallet);
      dispatch(setSelectedWallet(firstWallet._id));
    }
  }, [wallets, walletData, dispatch]);

  const handleSelect = (
    item: IWallet | ITransactionType,
    type: "wallet" | "transaction_type"
  ) => {
    if (type === "wallet" && "wallet_name" in item) {
      setWalletData(item);
      dispatch(setSelectedWallet(item._id));
    } else if (type === "transaction_type" && "label" in item) {
      dispatch(setSelectedTransactionType(item));
    }
    setDropdownType(null);
  };

  const processChartData = () => {
    if (!transactionsByWeek?.data?.transactionsByDay) {
      return [];
    }
    let maxAmount = 0;
    transactionsByWeek.data.transactionsByDay.forEach((day) => {
      maxAmount = Math.max(maxAmount, day.totalIncome, day.totalExpense);
    });
    return transactionsByWeek.data.transactionsByDay.map((item) => {
      const formattedDate = formatChartDate(new Date(item.date), "week");
      return {
        date: formattedDate,
        income: item.totalIncome,
        expense: item.totalExpense,
      };
    });
  };
  const chartData = processChartData();
  return (
    <View className="px-6 py-6 mt-6 border border-primary-brightBlue rounded-xl ">
      <View className="flex flex-row items-center justify-between mb-1">
        <TouchableOpacity
          className="flex-row items-center gap-x-2 bg-primary-brightBlue/20 px-2 py-1 rounded-lg"
          onPress={() => setDropdownType("wallet")}
        >
          <Image
            source={icons.wallet}
            className="w-8 h-8 rounded-full"
            resizeMode="contain"
          />
          <Text className="text-xs text-white font-medium">
            {walletData?.wallet_name || "Select Wallet"}
          </Text>
          <Icon name="chevron-down-outline" color="#fff" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenBottomSheet}
          activeOpacity={0.7}
          className="bg-primary-brightBlue/20 px-3 py-2 rounded-lg"
        >
          <Text className="font-medium text-primary-brighterBlue text-xs">
            See All Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full flex items-center justify-center">
        <LegendSection />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isWalletFetching || isWalletLoading || isFetchingWeek ? (
            <View
              className="w-full h-64 flex items-center justify-center mx-auto"
              style={{ minWidth: screenWidth - 70 }}
            >
              <ActivityIndicator size="large" color="#6BBFFF" />
              <Text className="text-white text-sm mt-2">Loading...</Text>
            </View>
          ) : chartData.length === 0 ? (
            <NoDataFound screenWidth={screenWidth} />
          ) : (
            <View className="flex flex-col items-center justify-center py-4">
              <BarChart
                width={Math.max(screenWidth - 70, chartData.length * 100)}
                barWidth={40}
                noOfSections={8}
                barBorderRadius={6}
                spacing={12}
                formatYLabel={(value) => formatValue(Number(value))}
                data={chartData.flatMap((item) => [
                  {
                    value: item.income,
                    frontColor: "#34D399",
                    barWidth: 40,
                    topLabelComponent: () => (
                      <View style={{ paddingBottom: 4 }}>
                        <Text
                          style={{
                            color: "white",
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
                    barWidth: 40,
                    topLabelComponent: () => (
                      <View style={{ paddingBottom: 4 }}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {item.expense > 0 ? formatValue(item.expense) : ""}
                        </Text>
                      </View>
                    ),
                    label: item.date,
                    labelTextStyle: {
                      color: "white",
                      fontSize: 11,
                      textAlign: "center",
                      transform: [{ translateX: -20 }],
                    },
                  },
                ])}
                xAxisThickness={1}
                yAxisThickness={1}
                xAxisColor="rgba(255,255,255,0.2)"
                yAxisColor="rgba(255,255,255,0.2)"
                yAxisTextStyle={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "500",
                }}
                height={250}
                activeOpacity={0.7}
                isAnimated={true}
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
        <ModalDropdown
          showDropdown={dropdownType === "wallet"}
          handleDropdownState={() => setDropdownType(null)}
          handleSelectedOptions={(item) => handleSelect(item, "wallet")}
          dropdownFor="wallet"
          textColor="black"
          data={wallets?.data || []}
        />
      </View>
    </View>
  );
};

export default SummaryReportSection;
