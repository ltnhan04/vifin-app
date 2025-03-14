import React, { useState, useEffect, useRef } from "react";
import { Stack, useSegments } from "expo-router";
import { View, TouchableOpacity, Image, Text } from "react-native";
import icons from "@/constants/icons";
import Icon from "react-native-vector-icons/Ionicons";
import { useGetBudgetsQuery } from "@/redux/features/budget/budgetApi";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedWallet } from "@/redux/features/wallet/walletSlice";
import ModalDropdown from "@/components/ui/ModalDropdown";
import Loading from "@/app/loading";
import { IWallet } from "@/types/wallet";

const BudgetLayout = () => {
  const dispatch = useAppDispatch();
  const isMountedRef = useRef(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletData, setWalletData] = useState<IWallet | null>(null);
  const { data, isLoading, isFetching } = useGetBudgetsQuery();
  const {
    data: wallets,
    isLoading: isWalletLoading,
    isFetching: isWalletFetching,
  } = useGetWalletsQuery();

  const segments = useSegments();
  const page = segments[segments.length - 1];

  useEffect(() => {
    if (wallets?.data?.length && !walletData) {
      setWalletData(wallets.data[0]);
      setSelectedWallet(wallets.data[0]._id);
    }
  }, [wallets]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  if (isLoading || isFetching || isWalletFetching || isWalletLoading) {
    return <Loading />;
  }

  const handleWalletSelect = (wallet: IWallet) => {
    setWalletData(wallet);
    dispatch(setSelectedWallet(wallet._id));
    if (isMountedRef.current) {
      setShowDropdown(false);
    }
  };

  return data?.data.length === 0 ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", animation: "fade_from_bottom" }}
      />
    </Stack>
  ) : (
    <>
      <Stack
        screenOptions={{
          headerTitle: walletData?.wallet_name
            ? page === "modal"
              ? "Running Budget"
              : ""
            : "Running Budget",
          headerTitleAlign: "center",
          headerBackground: () => <View className="bg-primary-dark flex-1" />,
          headerTintColor: "#fff",
          headerTitleStyle: { fontSize: 18 },
          headerBackVisible: false,
          headerRight: () =>
            walletData && page !== "modal" ? (
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
                <Text className="text-base text-white">
                  {walletData?.wallet_name}
                </Text>
                <Icon name="chevron-down-outline" color="#fff" size={20} />
              </TouchableOpacity>
            ) : null,
        }}
      >
        <Stack.Screen name="(top-tabs)" />
      </Stack>

      <ModalDropdown
        showDropdown={showDropdown}
        handleDropdownState={() => setShowDropdown(false)}
        handleSelectedOptions={handleWalletSelect}
        dropdownFor="wallet"
        data={wallets?.data || []}
      />
    </>
  );
};

export default BudgetLayout;
