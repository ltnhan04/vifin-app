import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { MoneyTextInput } from "@alexzunik/react-native-money-input";

import icons from "@/constants/icons";
import type { SelectedItemProps } from "@/types/selected-item";

const SelectedItem: React.FC<SelectedItemProps> = ({
  selectedItem,
  onChange,
  value,
  isLoading,
  openBottomSheet,
  selectedDateRange,
  symbol,
  categoryName,
  walletName,
}) => {
  const contentLeft = () => {
    switch (selectedItem) {
      case "category":
        return (
          <View className="w-[15%]">
            <View className="size-14 bg-secondary-gray-100 border-2 border-black rounded-full overflow-hidden">
              {symbol ? (
                <Image
                  source={{ uri: symbol }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : null}
            </View>
          </View>
        );
      case "amount":
        return (
          <View className="w-[15%]">
            <View className="bg-secondary-gray-100 rounded-md border-2 border-white py-1">
              <Text className="text-center font-semibold text-black">VND</Text>
            </View>
          </View>
        );
      case "dueDate":
        return (
          <View className="w-[15%]">
            <Icon color={"white"} name="calendar-number-outline" size={30} />
          </View>
        );
      case "wallet":
        return (
          <View className="w-[15%]">
            <Image source={icons.wallet} className="size-9" />
          </View>
        );
    }
  };

  const contentRight = () => {
    switch (selectedItem) {
      case "category":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between"
            activeOpacity={0.7}
            onPress={() =>
              router.push(
                "/(root)/(tabs)/budget/modal/(category)/list-category"
              )
            }
          >
            <Text className="font-rubik-semibold text-xl text-white">
              {categoryName ? categoryName : "Select category"}
            </Text>
            <Icon color={"white"} name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        );
      case "amount":
        const currency = "VND";
        return (
          <View className="flex flex-col justify-between ml-2">
            <Text className="font-rubik-semibold text-sm text-white">
              Amount
            </Text>
            <MoneyTextInput
              value={value?.toString()}
              placeholder="0"
              placeholderTextColor={"white"}
              className="text-2xl font-semibold text-white"
              maxLength={16}
              onChangeText={(_formatted, extracted) => {
                if (onChange && extracted) onChange(Number(extracted));
              }}
              suffix={`${currency ? "đ" : "$"}`}
              groupingSeparator=","
              fractionSeparator="."
              editable={!isLoading}
            />
          </View>
        );
      case "dueDate":
        return (
          <>
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              activeOpacity={0.7}
              onPress={openBottomSheet}
            >
              <Text className="font-rubik-medium text-base text-white">
                {selectedDateRange ? selectedDateRange : "Select Date Range"}
              </Text>
              <Icon color={"white"} name="chevron-forward-outline" size={20} />
            </TouchableOpacity>
          </>
        );
      case "wallet":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between"
            activeOpacity={0.7}
            onPress={openBottomSheet}
          >
            <Text className="font-rubik-medium text-xl text-white">
              {walletName ? walletName : "Select wallet"}
            </Text>
            <View>
              <Icon name="chevron-forward-outline" color={"white"} size={20} />
            </View>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View className="flex flex-row items-center">
      {contentLeft()}
      <View className="w-[85%] border-b border-secondary-gray-100 py-4">
        {contentRight()}
      </View>
    </View>
  );
};

export default SelectedItem;
