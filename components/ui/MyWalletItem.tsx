import { View, Text, Image } from "react-native";
import React from "react";
import { formatCurrency } from "@/utils/format-currency";

const MyWalletItem = ({
  name,
  price,
  symbol,
}: {
  name: string;
  price: number;
  symbol: string;
}) => {
  return (
    <View className="flex flex-row items-center justify-between my-2 ">
      <View className="flex flex-row items-center gap-x-3">
        <Image
          source={{ uri: symbol }}
          className="size-12 bg-primary-dark rounded-full"
        />
        <Text className="text-white font-rubik-medium text-lg">{name}</Text>
      </View>
      <Text className="text-white font-rubik-medium text-lg">
        {formatCurrency(price, "VND")}
      </Text>
    </View>
  );
};

export default MyWalletItem;
