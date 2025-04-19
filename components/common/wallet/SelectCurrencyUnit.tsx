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
    <View className="flex-row items-center gap-x-6 border-b border-white/10 pb-4 mb-4">
      <View className="pr-8 border-r border-white/10">
        <View className="bg-secondary-gray-100/20 rounded-xl p-2.5">
          <Icon
            name="cash"
            size={32}
            color={"rgba(255,255,255,0.9)"}
          />
        </View>
      </View>
      <Controller
        name="currency_unit"
        control={control}
        render={({ field: { value } }) => (
          <View className="flex flex-col items-start">
            <Text className="text-base font-rubik-medium text-white/70 mb-0.5">
              Currency Units
            </Text>
            <Text className="font-rubik-semibold text-xl text-white/90">
              {value}
            </Text>
          </View>
        )}
      />
      {errors.currency_unit && (
        <View className="flex-row items-center gap-x-2 ml-2">
          <Icon 
            name="alert-circle-outline" 
            size={14} 
            color="#ef4444" 
          />
          <Text className="text-secondary-red text-sm font-rubik-medium">
            {errors.currency_unit.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SelectCurrencyUnit;
