import { View, Image } from "react-native";
import React from "react";
import { Controller, Control } from "react-hook-form";
import SwitchTab from "@/components/ui/SwitchSelector";
import images from "@/constants/images";
import { CategoryType } from "@/schema/category.schema";

const SelectTransactionType = ({
  control,
  transactionType,
}: {
  control: Control<CategoryType>;
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
          render={({ field: { onChange } }) => (
            <SwitchTab
              initialValue={transactionType === "income" ? 1 : 0}
              item={["Expense", "Income"]}
              setWidth={200}
              onValueChange={onChange}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SelectTransactionType;
