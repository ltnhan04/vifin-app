import { View, Text, Switch } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { BudgetType } from "@/schema/budget.schema";

const RepeatBudget = ({ control }: { control: Control<BudgetType> }) => {
  return (
    <View className="flex flex-row items-center justify-between border-b border-secondary-gray-100 py-4">
      <View>
        <Text className="font-rubik-semibold text-base text-white">
          Repeat this budget
        </Text>
        <Text className="font-rubik-medium text-sm text-secondary-gray-100">
          Budget will renew automatically.
        </Text>
      </View>
      <Controller
        name="is_repeated"
        control={control}
        defaultValue={true}
        render={({ field: { onChange, value } }) => (
          <Switch
            trackColor={{ false: "#D1D5DB", true: "#6BBFFF" }}
            thumbColor={value ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#D1D5DB"
            onValueChange={(newValue) => onChange(newValue)}
            value={value}
          />
        )}
      />
    </View>
  );
};

export default RepeatBudget;
