import React, { useState, useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { View, TouchableOpacity, Image, Text } from "react-native";
import icons from "@/constants/icons";
import Icon from "react-native-vector-icons/Ionicons";
import ModalDropdown, { OptionItem } from "@/components/ui/ModalDropdown";
import { walletData } from "@/constants/data";

const BudgetLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletName, setWalletName] = useState("");

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleWalletSelect = (wallet: OptionItem) => {
    setWalletName(wallet.label);
    if (isMountedRef.current) {
      setShowDropdown(false);
    }
  };

  const flag = false;

  return flag ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  ) : (
    <>
      <Stack
        screenOptions={{
          headerTitle: `${walletName ? "" : "Running Budget"}`,
          headerTitleAlign: "center",
          headerBackground() {
            return <View className="bg-primary-dark flex-1" />;
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity
              className="flex-row items-center gap-x-2"
              onPress={() => {
                if (isMountedRef.current) {
                  setShowDropdown((prev) => !prev);
                }
              }}
            >
              <Image
                source={icons.wallet}
                className="w-10 h-10 rounded-full"
                resizeMode="contain"
              />
              <Text className="text-sm text-white">{walletName}</Text>
              <Icon name="chevron-down-outline" color="#fff" size={20} />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="(top-tabs)" />
      </Stack>
      <ModalDropdown
        showDropdown={showDropdown}
        handleDropdownState={() => setShowDropdown(false)}
        handleSelectedOptions={handleWalletSelect}
        dropdownFor="wallet"
        data={walletData}
      />
    </>
  );
};

export default BudgetLayout;
