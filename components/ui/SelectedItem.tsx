import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import type { SelectedItemType } from "@/types/budget";

interface SelectedItemProps {
  selectedItem: SelectedItemType;
}

const SelectedItem: React.FC<SelectedItemProps> = ({ selectedItem }) => {
  const router = useRouter();
  const contentLeft = () => {
    switch (selectedItem) {
      case "category":
        return (
          <View className="w-[15%]">
            <View className="size-12 bg-secondary-gray-100 border-2 border-black rounded-full"></View>
          </View>
        );
      case "amount":
        return (
          <View className="w-[15%]">
            <View className="bg-secondary-gray-100 rounded-md border-2 border-black py-1">
              <Text className="text-center font-semibold text-black">VND</Text>
            </View>
          </View>
        );
      case "dueDate":
        return (
          <View className="w-[15%]">
            <Icon name="calendar-number-outline" size={30} />
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
              router.push("/(tabs)/budget/modal/(category)/selected-categories")
            }
          >
            <Text className="font-rubik-semibold text-xl text-secondary-gray-200">
              Select category
            </Text>
            <View>
              <Icon name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
        );
      case "amount":
        return (
          <View className="flex flex-col justify-between ml-2">
            <Text className="font-rubik-semibold text-sm text-secondary-gray-200">
              Amount
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={14}
              placeholder="0"
              placeholderTextColor={"#000"}
            />
          </View>
        );
      case "dueDate":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between"
            activeOpacity={0.7}
            onPress={() =>
              router.push("/(tabs)/budget/modal/selected-calendar")
            }
          >
            <Text className="font-rubik-medium text-base text-secondary-gray-200">
              This Month (1/02 - 28/02)
            </Text>
            <View>
              <Icon name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
        );
      case "wallet":
        return (
          <TouchableOpacity
            className="flex flex-row justify-between"
            activeOpacity={0.7}
          >
            <Text className="font-rubik-medium text-xl text-secondary-gray-200">
              Meme Wallet
            </Text>
            <View>
              <Icon name="chevron-forward-outline" size={20} />
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
