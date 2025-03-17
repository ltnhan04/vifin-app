import React, { useState, useEffect, useRef } from "react";
import { Stack, useSegments } from "expo-router";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedWallet } from "@/redux/features/wallet/walletSlice";
import ModalDropdown from "@/components/ui/ModalDropdown";
import Loading from "@/app/loading";
import icons from "@/constants/icons";
import { IWallet } from "@/types/wallet";

const BudgetLayout = () => {
  const dispatch = useAppDispatch();
  const isMountedRef = useRef(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletData, setWalletData] = useState<IWallet | null>(null);

  const {
    data: wallets,
    isLoading: isWalletLoading,
    isFetching: isWalletFetching,
  } = useGetWalletsQuery();

  const segments = useSegments();
  const page = segments[segments.length - 1];

  useEffect(() => {
    if (wallets?.data?.length && !walletData) {
      const firstWallet = wallets.data[0];
      setWalletData(firstWallet);
      dispatch(setSelectedWallet(firstWallet._id));
    }
  }, [wallets, walletData, dispatch]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleWalletSelect = (wallet: IWallet) => {
    if (!isMountedRef.current) return;
    setWalletData(wallet);
    dispatch(setSelectedWallet(wallet._id));
    setShowDropdown(false);
  };

  if (isWalletFetching || isWalletLoading) {
    return <Loading />;
  }

  if (!wallets?.data || wallets.data.length === 0) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", animation: "fade_from_bottom" }}
        />
      </Stack>
    );
  }

  return (
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
                  if (isMountedRef.current) setShowDropdown((prev) => !prev);
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
        handleSelectedOptions={(option) =>
          handleWalletSelect(option as IWallet)
        }
        dropdownFor="wallet"
        data={wallets?.data || []}
      />
    </>
  );
};

export default BudgetLayout;
