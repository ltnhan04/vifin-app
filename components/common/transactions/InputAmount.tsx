import { View, Text } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TransactionType } from "@/schema/transaction.schema";
import Icon from "react-native-vector-icons/Ionicons";
import SelectedItem from "@/components/ui/SelectedItem";

const InputAmount = ({
  control,
  errors,
  disabled,
}: {
  control: Control<TransactionType>;
  errors: FieldErrors<TransactionType>;
  disabled: boolean;
}) => {
  return (
    <View>
      <Controller
        name="amount"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectedItem
            isLoading={disabled}
            selectedItem="amount"
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.amount && (
        <View className="flex-row items-center ml-16 mt-2 gap-x-1">
          <Icon name="alert-circle-outline" size={16} color="#EF4444" />
          <Text className="text-secondary-red font-bold text-base">
            {errors.amount.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default InputAmount;
