import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Control, Controller } from "react-hook-form";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { BudgetType } from "@/schema/budget.schema";
import { formatCurrency } from "@/utils/format-currency";
import Icon from "react-native-vector-icons/Ionicons";
import NoWallet from "@/components/ui/NoWallet";
import images from "@/constants/images";
import { router } from "expo-router";

const WalletPickerBottom = ({
  bottomRef,
  control,
}: {
  bottomRef: React.RefObject<BottomSheet>;
  control: Control<BudgetType>;
}) => {
  const { data: wallets, isLoading, isFetching } = useGetWalletsQuery();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        opacity={0.5}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomRef}
      snapPoints={["25%", "50%"]}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: "#081657" }}
    >
      <BottomSheetView className="flex-1 px-5 py-4 bg-white">
        <Text className="text-xl font-bold mb-4 text-center text-gray-800">
          Select Wallet
        </Text>

        {isLoading || isFetching ? (
          <ActivityIndicator size="large" color="#081657" />
        ) : (
          <Controller
            control={control}
            name="wallet_id"
            render={({ field: { onChange, value } }) => (
              <BottomSheetFlatList
                data={wallets?.data || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                      onChange(item._id);
                      bottomRef.current?.close();
                      if (item._id === value) {
                        onChange("");
                        bottomRef.current?.close();
                      }
                    }}
                    activeOpacity={0.7}
                    className={`flex-row items-center p-4 mb-2 rounded-xl border ${
                      value === item._id
                        ? "bg-blue-100 border-primary-blue"
                        : "bg-gray-50 border-gray-200"
                    } shadow-sm`}
                  >
                    <Image
                      source={{ uri: item.symbol }}
                      className="w-16 h-16 rounded-full mr-4"
                      resizeMode="contain"
                    />

                    <View className="flex-1">
                      <Text className="text-xl font-semibold text-gray-800">
                        {item.wallet_name}
                      </Text>
                      <Text className="text-lg text-gray-500">
                        {formatCurrency(Number(item.amount), "VND")}
                      </Text>
                    </View>

                    {value === item._id && (
                      <Icon
                        name="checkmark-circle"
                        size={28}
                        color="#6BBFFF"
                        className="ml-2"
                      />
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <View className="flex flex-col items-center justify-center">
                    <Image
                      source={images.emptyWallet}
                      resizeMode="contain"
                      className="w-40 h-40"
                    />
                    <Text className="text-base text-secondary-gray-200 font-semibold">
                      No wallets set yet! 📉
                    </Text>
                    <Text className="text-sm text-secondary-gray-200 text-center px-8 mt-2">
                      Stay on track with your finances. Start by adding a wallet
                      now! 🚀
                    </Text>
                    <TouchableOpacity
                      className="mt-6 bg-primary px-4 py-3 rounded-lg bg-primary-brighterBlue shadow-lg"
                      onPress={() =>
                        router.push(
                          "/(root)/(tabs)/home/(wallet)/create-wallet"
                        )
                      }
                    >
                      <Text className="text-white text-sm font-bold">
                        Add Wallet
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default WalletPickerBottom;
