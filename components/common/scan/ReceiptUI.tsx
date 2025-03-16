import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

const ReceiptUI = (receipt: any) => {
  return (
    <View className="mt-8 w-full bg-[#FFF8E7] p-5 rounded-lg shadow-lg">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">
          {receipt.storeName}
        </Text>
        <Text className="text-gray-600 mt-1">Receipt</Text>
      </View>

      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <Icon name="receipt-outline" size={18} color="#316F95" />
          <Text className="ml-2 text-gray-700 text-sm">
            Invoice: {receipt.invoiceNumber}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="calendar-outline" size={18} color="#316F95" />
          <Text className="ml-2 text-gray-700 text-sm">
            {formatDate(new Date(receipt.date))}
          </Text>
        </View>
      </View>

      <View className="border-t border-b border-dashed border-gray-400 py-2 mb-3">
        <View className="flex-row justify-between">
          <Text className="font-bold text-gray-800">Item</Text>
          <Text className="font-bold text-gray-800">Price</Text>
        </View>
      </View>

      <View className="mb-4">
        {receipt &&
          receipt.items.map((item: any, index: any) => (
            <View key={index} className="flex-row justify-between py-1">
              <Text className="text-gray-700 font-mono">{item.name}</Text>
              <Text className="text-gray-700 font-mono">
                {formatCurrency(Number(item.price), "VND")}
              </Text>
            </View>
          ))}
      </View>

      <View className="border-t border-dashed border-gray-400 pt-3">
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold text-gray-800 text-lg">Total:</Text>
          <Text className="font-bold text-gray-800 text-lg">
            {formatCurrency(Number(receipt.total), "VND")}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600 text-sm">Type: {receipt.type}</Text>
          <Text className="text-gray-600 text-sm">
            Category: {receipt.category}
          </Text>
        </View>
      </View>

      <View className="mt-4 items-center">
        <Text className="text-gray-500 text-sm">
          Thank you for your purchase!
        </Text>
      </View>
    </View>
  );
};

export default ReceiptUI;
