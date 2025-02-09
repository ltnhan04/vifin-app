import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MyWalletItem from "@/components/ui/MyWalletItem";
import icons from "@/constants/icons";
import { router } from "expo-router";

const MyWalletSection = () => {
  return (
    <View className="px-6 py-4 border border-primary-brightBlue rounded-xl mt-6">
      <View className="flex flex-row item-center justify-between">
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
          onPress={() => router.push("/(tabs)/home/(wallet)")}
        >
          <Text className="font-rubik-light text-primary-brighterBlue text-sm">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-[0.2px] my-2 border-y-secondary-gray-200"></View>

      <MyWalletItem name="Momo Wallet" price={50000} />
      <MyWalletItem name="Meme Wallet" price={50000} />
    </View>
  );
};

export default MyWalletSection;
