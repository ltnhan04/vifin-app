import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import MyWalletItem from "@/components/ui/MyWalletItem";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { useAppSelector } from "@/redux/hooks";

const MyWalletSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isFetching } = useGetWalletsQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });
  const wallets = data?.data?.slice(0, 3) || [];

  useEffect(() => {
    if (user && !isLoading && !isFetching && wallets.length === 0) {
      Alert.alert(
        "You have no wallet",
        "You need to create a wallet to continue using the app.",
        [
          {
            text: "Create Wallet",
            onPress: () =>
              router.push("/(root)/(tabs)/home/(wallet)/create-wallet"),
          },
        ],
        { cancelable: true }
      );
    }
  }, [user, isLoading, isFetching, wallets.length]);

  return (
    <View className="px-6 py-4 border border-primary-brightBlue rounded-xl">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={icons.wallet}
            resizeMode="contain"
            className="size-8"
          />
          <Text className="font-rubik-medium text-lg text-secondary-yellow ml-3">
            My Wallet
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(root)/(tabs)/home/(wallet)")}
        >
          <Text className="font-rubik-light text-primary-brighterBlue text-sm">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full border-[0.2px] my-2 border-y-gray-600"></View>

      {isLoading || isFetching ? (
        <View className="flex items-center">
          <Text className="text-base text-center text-white">Loading...</Text>
        </View>
      ) : wallets.length > 0 ? (
        wallets.map((item, index) => (
          <MyWalletItem
            key={index}
            price={Number(item.amount)}
            symbol={item.symbol}
            name={item.wallet_name}
          />
        ))
      ) : (
        <View className="flex items-center">
          <Text className="text-base text-center text-white">
            No wallets available
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyWalletSection;
