import { View, Text } from "react-native";
import React from "react";
import SelectedItem from "@/components/ui/SelectedItem";
import { Control, FieldErrors, useWatch } from "react-hook-form";
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
  const wallet_id = useWatch({ control, name: "wallet_id" });
  const errorsWallet = errors?.wallet_id?.message;
  const { data } = useGetWalletQuery({ id: wallet_id }, { skip: !wallet_id });
  return (
    <View className="flex flex-col items-center">
      <SelectedItem
        walletName={data?.data.wallet_name}
        selectedItem="wallet"
        openBottomSheet={expand}
      />
      {errorsWallet && (
        <Text className="text-secondary-red font-medium mt-2">
          {errorsWallet}
        </Text>
      )}
    </View>
  );
};

export default SelectWalletInBudget;
