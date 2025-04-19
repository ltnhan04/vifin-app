import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Stack, useSegments } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedWallet } from "@/redux/features/wallet/walletSlice";
import { setSelectedTransactionType } from "@/redux/features/transaction/transactionSlice";
import Loading from "@/app/loading";
import ModalDropdown from "@/components/ui/ModalDropdown";
import icons from "@/constants/icons";
import { IWallet } from "@/types/wallet";
import { ITransactionType } from "@/types/transaction";
import { transactionType } from "@/constants/data";

const TransactionLayout = () => {
  const segments = useSegments();
  const page = segments[segments.length - 1];
  const dispatch = useAppDispatch();
  const transactionData = useAppSelector(
    (state) => state.transaction.selectedTransaction
  );
  const [dropdownType, setDropdownType] = useState<
    "wallet" | "transaction_type" | null
  >(null);
  const [walletData, setWalletData] = useState<IWallet | null>(null);

  const {
    data: wallets,
    isLoading: isWalletLoading,
    isFetching: isWalletFetching,
  } = useGetWalletsQuery();

  useEffect(() => {
    if (wallets?.data?.length && !walletData) {
      const firstWallet = wallets.data[0];
      setWalletData(firstWallet);
      dispatch(setSelectedWallet(firstWallet._id));
      dispatch(setSelectedTransactionType(transactionType[0]));
    }
  }, [wallets, walletData, dispatch]);

  if (isWalletFetching || isWalletLoading) {
    return <Loading />;
  }

  const handleSelect = (
    item: IWallet | ITransactionType,
    type: "wallet" | "transaction_type"
  ) => {
    if (type === "wallet" && "wallet_name" in item) {
      setWalletData(item);
      dispatch(setSelectedWallet(item._id));
    } else if (type === "transaction_type" && "label" in item) {
      dispatch(setSelectedTransactionType(item));
    }
    setDropdownType(null);
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerBackground: () => (
            <View className="bg-primary-dark" style={{ flex: 1 }} />
          ),
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              disabled={page === "modal" || page === "list-category"}
              className="flex-row items-center gap-x-2"
              onPress={() => setDropdownType("wallet")}
            >
              <Image
                source={icons.wallet}
                className="w-10 h-10 rounded-full"
                resizeMode="contain"
              />
              <Text className="text-base text-white font-medium">
                {walletData?.wallet_name}
              </Text>
              <Icon name="chevron-down-outline" color="#fff" size={20} />
            </TouchableOpacity>
          ),
          headerLeft: () =>
            page === "modal" || page === "list-category" ? null : (
              <TouchableOpacity
                className="px-4 py-2 border-2 rounded-lg border-secondary-gray-100"
                onPress={() => setDropdownType("transaction_type")}
              >
                <View className="flex flex-row items-center">
                  {transactionData ? (
                    <Image
                      source={transactionData.icon}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  ) : null}
                  <Text className="text-white font-semibold text-base mx-2">
                    {transactionData && transactionData.label}
                  </Text>
                  <Icon name="chevron-down-outline" size={16} color={"#fff"} />
                </View>
              </TouchableOpacity>
            ),
        }}
      >
        <Stack.Screen name="(top-tabs)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", animation: "fade_from_bottom" }}
        />
      </Stack>

      <ModalDropdown
        showDropdown={dropdownType === "wallet"}
        handleDropdownState={() => setDropdownType(null)}
        handleSelectedOptions={(item) => handleSelect(item, "wallet")}
        dropdownFor="wallet"
        data={wallets?.data || []}
      />

      <ModalDropdown
        showDropdown={dropdownType === "transaction_type"}
        handleDropdownState={() => setDropdownType(null)}
        handleSelectedOptions={(item) => handleSelect(item, "transaction_type")}
        dropdownFor="transaction_type"
        data={transactionType}
      />
    </>
  );
};

export default TransactionLayout;
