import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import images from "@/constants/images";

const NoWallet = () => {
  return (
    <View className="flex flex-col items-center justify-center mt-[35%]">
      <Image
        source={images.emptyWallet}
        resizeMode="contain"
        className="w-60 h-60 opacity-90"
      />
      <Text className="text-2xl text-white font-semibold">
        No wallets set yet! 📉
      </Text>
      <Text className="text-lg text-white text-center px-8 mt-2">
        Stay on track with your finances. Start by adding a wallet now! 🚀
      </Text>
      <TouchableOpacity
        className="mt-6 bg-primary px-6 py-3 rounded-lg bg-primary-brighterBlue shadow-lg"
        onPress={() =>
          router.push("/(root)/(tabs)/home/(wallet)/create-wallet")
        }
      >
        <Text className="text-white text-lg font-bold">Add Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoWallet;
