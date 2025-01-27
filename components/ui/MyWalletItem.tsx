import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";

const MyWalletItem = ({ name, price }: { name: string; price: number }) => {
  return (
    <View className="flex flex-row items-center justify-between mt-1">
      <View className="flex flex-row items-center gap-x-3">
        <Image
          source={icons.walletIcon}
          className="size-9 bg-primary-dark rounded-full"
        />
        <Text className="text-white font-rubik-medium ">{name}</Text>
      </View>
      <Text className="text-white font-rubik-medium ">{price} VND</Text>
    </View>
  );
};

export default MyWalletItem;
