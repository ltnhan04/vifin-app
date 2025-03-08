import { View, Text } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { WalletType } from "@/schema/wallet.schema";
import SelectedItem from "@/components/ui/SelectedItem";
import Icon from "react-native-vector-icons/Ionicons";

const InputWalletAmount = ({
  control,
  errors,
}: {
  control: Control<WalletType>;
  errors: FieldErrors<WalletType>;
}) => {
  return (
    <View>
      <Controller
        name="amount"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectedItem
            selectedItem="amount"
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.amount && (
        <View className="flex-row items-center gap-x-1">
          <Icon name="alert-circle-outline" size={16} color="#EF4444" />
          <Text className="text-red-500 text-sm">{errors.amount.message}</Text>
        </View>
      )}
    </View>
  );
};

export default InputWalletAmount;
