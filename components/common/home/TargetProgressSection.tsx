import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useGetBudgetByRepeatTypeQuery } from "@/redux/features/budget/budgetApi";
import { useAppSelector } from "@/redux/hooks";
import icons from "@/constants/icons";
import TargetItem from "@/components/ui/TargetItem";

const TargetProgressSection = () => {
  const walletId = useAppSelector((state) => state.wallet.selectedWalletId);
  const { data, isLoading, isFetching } = useGetBudgetByRepeatTypeQuery(
    {
      walletId: walletId as string,
      repeat_type: "weekly",
    },
    { skip: !walletId }
  );
  return (
    <View className="px-6 py-4 mt-6 border border-primary-brightBlue rounded-xl">
      <View className="flex flex-row items-center justify-between mb-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.target}
            resizeMode="contain"
            className="size-7"
          />
          <Text className="font-medium text-lg text-secondary-yellow ml-2">
            Target Progress
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(root)/(tabs)/budget/(top-tabs)")}
        >
          <Text className="font-rubik-light text-primary-brighterBlue text-sm">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {isFetching || isLoading ? (
          <View className="w-full h-64 flex items-center justify-center mx-auto">
            <ActivityIndicator size="large" color="#6BBFFF" />
            <Text className="text-white text-sm mt-2">Loading...</Text>
          </View>
        ) : (
          <>
            {data?.data
              .slice(0, 5)
              .map((budget, index) => (
                <TargetItem
                  key={index}
                  categoryName={budget.category.name}
                  amount={budget.amount}
                  date={budget.dueDate}
                  usage={budget.usage}
                  image={budget.category.symbol}
                />
              ))}
            {data?.data.length === 0 && (
              <Text className="text-white text-center pb-2">
                No targets available
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default TargetProgressSection;
