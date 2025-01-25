import { View, Text } from "react-native";
import React from "react";

const MyWalletItem = ({ name, price }: { name: string; price: number }) => {
  return (
    <View className="flex flex-row justify-between mt-1">
      <Text className="text-white font-rubik-medium ">{name}</Text>
      <Text className="text-white font-rubik-medium ">{price} VND</Text>
    </View>
  );
};

export default MyWalletItem;
