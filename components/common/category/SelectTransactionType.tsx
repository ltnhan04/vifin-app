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
    <View className="flex-row items-center gap-x-6 mb-4 border-b pb-4 border-white/10">
      <View className="pr-8 border-r border-white/10">
        <View className="bg-secondary-gray-100/20 rounded-xl p-2">
          <Image
            source={images.expenseIncome}
            resizeMode="contain"
            className="w-10 h-10 opacity-90"
          />
        </View>
      </View>
      <View className="flex-1">
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
