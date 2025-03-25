import { View, Image } from "react-native";
import React from "react";
import { Controller, Control } from "react-hook-form";
import SwitchTab from "@/components/ui/SwitchSelector";
import images from "@/constants/images";
import { TransactionType } from "@/schema/transaction.schema";

const SelectTransactionType = ({
  control,
  transactionType,
}: {
  control: Control<TransactionType>;
  transactionType?: string;
}) => {
  return (
    <View className="flex-row items-center gap-x-8 mb-4 border-b pb-5 border-gray-500">
      <Image
        source={images.expenseIncome}
        resizeMode="contain"
        className="w-12 h-12"
      />
      <View className="w-full">
        <Controller
          name="transaction_type"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <SwitchTab
                initialValue={transactionType === "income" ? 1 : 0}
                item={["Expense", "Income"]}
                setWidth={200}
                onValueChange={(value) => {
                  onChange(value === "Income" ? "income" : "expense");
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default SelectTransactionType;
