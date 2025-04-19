import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import SelectedItem from "@/components/ui/SelectedItem";
import { useGetWalletQuery } from "@/redux/features/wallet/walletApi";
import { BudgetType } from "@/schema/budget.schema";

const SelectWalletInBudget = ({
  expand,
  control,
  errors,
}: {
  expand: () => void;
  control: Control<BudgetType>;
  errors: FieldErrors<BudgetType>;
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
              page="budget"
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

export default SelectWalletInBudget;
