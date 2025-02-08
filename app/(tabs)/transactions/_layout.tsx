import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import ModalDropdown, { OptionItem } from "@/components/ui/ModalDropdown";
import { category, walletData } from "@/constants/data";

const TransactionLayout = () => {
  const [dropdownType, setDropdownType] = useState<
    "wallet" | "category" | null
  >(null);
  const [selectedValue, setSelectedValue] = useState<{
    walletName: string;
    category: string;
  }>({ walletName: "", category: "Expense" });
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const handleSelect = (item: OptionItem, type: "wallet" | "category") => {
    setSelectedValue((prev) => ({
      ...prev,
      [type === "wallet" ? "walletName" : "category"]: item.label as string,
    }));
    if (isMountedRef.current) {
      if (type === "wallet") {
        setDropdownType("wallet");
      } else {
        setDropdownType("category");
      }
    }
  };
  return (
    <>
      <Stack
        screenOptions={{
          headerBackground: () => {
            return <View className="bg-primary-dark" style={{ flex: 1 }} />;
          },
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-row items-center gap-x-2"
              onPress={() => {
                if (isMountedRef.current) {
                  setDropdownType("wallet");
                }
              }}
            >
              <Image
                source={icons.wallet}
                className="w-10 h-10 rounded-full"
                resizeMode="contain"
              />
              <Text className="text-white text-sm">
                {selectedValue.walletName}
              </Text>
              <Icon name="chevron-down-outline" color="#fff" size={20} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (isMountedRef.current) {
                  setDropdownType("category");
                }
              }}
              className="px-4 py-2 border-2 rounded-lg border-secondary-gray-100"
            >
              <View className="flex flex-row items-center">
                <Image
                  source={
                    selectedValue.category === "Income"
                      ? icons.dollar
                      : icons.expense
                  }
                  className="size-8"
                  resizeMode="contain"
                />
                <Text className="text-white font-semibold text-base mx-2">
                  {selectedValue.category}
                </Text>
                <Icon name="chevron-down-outline" size={16} color={"#fff"} />
              </View>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="(top-tabs)" />
      </Stack>
      <ModalDropdown
        showDropdown={dropdownType === "wallet"}
        handleDropdownState={() => setDropdownType(null)}
        handleSelectedOptions={(item) => handleSelect(item, "wallet")}
        data={walletData}
        dropdownFor="wallet"
      />
      <ModalDropdown
        showDropdown={dropdownType === "category"}
        handleDropdownState={() => setDropdownType(null)}
        handleSelectedOptions={(item) => handleSelect(item, "category")}
        data={category}
        dropdownFor="category"
      />
    </>
  );
};

export default TransactionLayout;
