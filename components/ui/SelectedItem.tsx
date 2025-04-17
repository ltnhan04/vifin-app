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
  page,
}) => {
  const contentLeft = () => {
    switch (selectedItem) {
      case "category":
        return (
          <View className="w-[15%] items-center justify-center">
            <View className="size-12 bg-secondary-gray-100/90 shadow-lg shadow-black/25 border border-white/20 rounded-full overflow-hidden">
              {symbol ? (
                <Image
                  source={{ uri: symbol }}
                  style={{ width: "100%", height: "100%" }}
                  className="opacity-90"
                />
              ) : null}
            </View>
          </View>
        );
      case "amount":
        return (
          <View className="w-[15%] mr-2">
            <View className="bg-secondary-gray-100 rounded-md border-2 border-white py-1">
              <Text className="text-center font-semibold text-black">VND</Text>
            </View>
          </View>
        );
      case "dueDate":
        return (
          <View className="w-[15%] items-center justify-center">
            <View className="bg-secondary-gray-100/20 rounded-xl p-2">
              <Icon color={"white"} name="calendar-number-outline" size={28} />
            </View>
          </View>
        );
      case "wallet":
        return (
          <View className="w-[15%] items-center justify-center">
            <View className="bg-secondary-gray-100/20 rounded-xl p-2">
              <Image source={icons.wallet} className="size-7 opacity-90" />
            </View>
          </View>
        );
    }
  };

  const contentRight = () => {
    switch (selectedItem) {
      case "category":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between items-center px-3 py-2 active:opacity-70"
            activeOpacity={0.7}
            onPress={() =>
              router.push(
                page === "budget"
                  ? "/(root)/(tabs)/budget/modal/(category)/list-category"
                  : "/transactions/modal/list-category"
              )
            }
          >
            <Text className="font-rubik-semibold text-lg text-white/90">
              {categoryName ? categoryName : "Select category"}
            </Text>
            <Icon
              color={"rgba(255,255,255,0.8)"}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        );
      case "amount":
        const currency = "VND";
        return (
          <View className="flex flex-col justify-between px-3 py-1">
            <Text className="font-rubik-medium text-sm text-white/70 mb-1">
              Amount
            </Text>
            <MoneyTextInput
              value={value?.toString()}
              placeholder="0"
              placeholderTextColor={"rgba(255,255,255,0.5)"}
              className="text-lg font-rubik-semibold text-white/90 -ml-0.5"
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
          <TouchableOpacity
            className="flex flex-row justify-between items-center px-3 py-2.5 active:opacity-70"
            activeOpacity={0.7}
            onPress={openBottomSheet}
          >
            <Text className="font-rubik-medium text-base text-white/90">
              {selectedDateRange ? selectedDateRange : "Select Date Range"}
            </Text>
            <Icon
              color={"rgba(255,255,255,0.8)"}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        );
      case "wallet":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between items-center px-3 py-2.5 active:opacity-70"
            activeOpacity={0.7}
            onPress={openBottomSheet}
          >
            <Text className="font-rubik-medium text-base text-white/90">
              {walletName ? walletName : "Select wallet"}
            </Text>
            <Icon
              color={"rgba(255,255,255,0.8)"}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        );
    }
  };

  return (
    <View className="flex flex-row items-center my-1">
      {contentLeft()}
      <View className="w-[85%] border-b border-white/10 rounded-lg bg-white/5">
        {contentRight()}
      </View>
    </View>
  );
};

export default SelectedItem;
