import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Controller, FieldErrors, Control } from "react-hook-form";
import type { WalletType } from "@/schema/wallet.schema";

const SelectCurrencyUnit = ({
  control,
  errors,
}: {
  control: Control<WalletType>;
  errors: FieldErrors<WalletType>;
}) => {
  return (
    <View className="flex-row items-center gap-x-4 border-b border-gray-300 pb-4 mb-4">
      <Icon
        name="cash"
        size={40}
        color={"#fff"}
        className="pr-8 border-gray-300 border-r"
      />
      <Controller
        name="currency_unit"
        control={control}
        render={({ field: { value } }) => (
          <View className="flex flex-col items-start">
            <Text className="text-lg text-white">Currency Units</Text>
            <Text className="font-medium text-xl text-white">{value}</Text>
          </View>
        )}
      />
      {errors.currency_unit && (
        <View className="flex-row items-center gap-x-1">
          <Icon name="alert-circle-outline" size={16} color="#EF4444" />
          <Text className="text-red-500 text-sm">
            {errors.currency_unit.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SelectCurrencyUnit;
