import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Easing } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "@/utils/format-currency";
import { CollapsibleTransactionItemProps } from "@/types/transaction";

const CollapsibleTransactionItem: React.FC<CollapsibleTransactionItemProps> = ({
  date,
  day,
  monthYear,
  totalAmount,
  transactions,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View className="bg-white/20 rounded-xl p-4 my-2 border border-white/30 shadow-lg">
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        activeOpacity={0.8}
        className="flex-row justify-between items-center"
      >
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-white w-10 text-center">
            {date}
          </Text>
          <View className="ml-2">
            <Text className="text-lg font-medium text-white">{day}</Text>
            <Text className="text-sm text-white/70">{monthYear}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg font-semibold text-red-400">
            {formatCurrency(totalAmount, "VND")}
          </Text>
          <Icon
            name={collapsed ? "chevron-down-outline" : "chevron-up-outline"}
            size={20}
            color="#AFCBFF"
            className="ml-2"
          />
        </View>
      </TouchableOpacity>

      <Collapsible
        collapsed={collapsed}
        duration={500}
        easing={Easing.out(Easing.ease)}
      >
        <View className="mt-4">
          {transactions.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center py-2 border-b border-white/30"
            >
              <View className="flex-row items-center">
                <Image source={item.icon} className="w-10 h-10 rounded-full" />
                <View className="ml-3">
                  <Text className="text-base font-semibold text-white">
                    {item.category}
                  </Text>
                </View>
              </View>
              <Text className="text-lg font-semibold text-red-400">
                {formatCurrency(item.amount, "VND")}
              </Text>
            </View>
          ))}
        </View>
      </Collapsible>
    </View>
  );
};

export default CollapsibleTransactionItem;
