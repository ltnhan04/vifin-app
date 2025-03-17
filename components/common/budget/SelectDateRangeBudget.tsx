import { View, Text } from "react-native";
import React from "react";
import SelectedItem from "@/components/ui/SelectedItem";
import { Control, FieldErrors, useWatch } from "react-hook-form";
import { BudgetType } from "@/schema/budget.schema";
import { formatDate } from "@/utils/format-date";

const SelectDateRangeBudget = ({
  expand,
  control,
  errors,
}: {
  expand: () => void;
  control: Control<BudgetType>;
  errors: FieldErrors<BudgetType>;
}) => {
  const startDate = useWatch({ control, name: "startDate" });
  const dueDate = useWatch({ control, name: "dueDate" });
  const errorStartDate = errors?.startDate?.message;
  const errorDueDate = errors?.dueDate?.message;
  return (
    <View className="flex flex-col items-center">
      <SelectedItem
        selectedDateRange={`${formatDate(startDate)} - ${formatDate(dueDate)}`}
        selectedItem="dueDate"
        openBottomSheet={expand}
      />
      {errorStartDate && (
        <Text className="text-secondary-red font-medium mt-2">
          {errorStartDate}
        </Text>
      )}
      {errorDueDate && (
        <Text className="text-secondary-red font-medium mt-2">
          {errorDueDate}
        </Text>
      )}
    </View>
  );
};

export default SelectDateRangeBudget;
