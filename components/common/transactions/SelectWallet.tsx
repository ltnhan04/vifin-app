import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TransactionType } from "@/schema/transaction.schema";
import SelectedItem from "@/components/ui/SelectedItem";
import { useGetWalletQuery } from "@/redux/features/wallet/walletApi";
import { useAppSelector } from "@/redux/hooks";

const SelectWallet = ({
  expand,
  control,
  errors,
}: {
  expand: () => void;
  control: Control<TransactionType>;
  errors: FieldErrors<TransactionType>;
}) => {
  const selectedWalletId = useAppSelector(
    (state) => state.wallet.selectedWalletId
  );

  return (
    <Controller
      name="wallet_id"
      control={control}
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (selectedWalletId && selectedWalletId !== value) {
            onChange(selectedWalletId);
          }
        }, [selectedWalletId]);

        const { data } = useGetWalletQuery({ id: value }, { skip: !value });

        return (
          <View className="flex flex-col items-center">
            <SelectedItem
              page="transaction"
              walletName={data?.data.wallet_name}
              selectedItem="wallet"
              openBottomSheet={expand}
            />
            {errors.wallet_id && (
              <Text className="text-secondary-red font-medium mt-2">
                {errors.wallet_id.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};
export default SelectWallet;
