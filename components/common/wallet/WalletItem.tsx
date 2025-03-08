import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "@/utils/format-currency";

interface WalletItemProps {
  walletIcon: any;
  walletName: string;
  amount: number;
}

const WalletItem: React.FC<WalletItemProps> = ({
  walletIcon,
  walletName,
  amount,
}) => {
  return (
    <View className="flex flex-row justify-between items-center mt-4">
      <View className="flex flex-row items-center gap-x-3">
        <Image
          source={walletIcon}
          className="size-9 bg-primary-dark rounded-full"
        />
        <View>
          <Text className="text-black font-rubik-medium text-xl">
            {walletName}
          </Text>
          <Text className="text-black font-rubik-medium text-lg">
            {formatCurrency(amount, "VND")}
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-x-2">
        <TouchableOpacity
          className="flex flex-row items-center gap-x-2 px-3 py-2 bg-primary-blue rounded-lg"
          activeOpacity={0.8}
        >
          <Icon name="create-outline" color={"#fff"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-x-2 px-3 py-2 bg-secondary-red rounded-lg"
          activeOpacity={0.8}
        >
          <Icon name="trash-outline" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletItem;
