import { View, Text } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import SelectedItem from "@/components/ui/SelectedItem";
import { BudgetType } from "@/schema/budget.schema";

const SelectCategoryInBudget = ({
  control,
  errors,
}: {
  control: Control<BudgetType>;
  errors: FieldErrors<BudgetType>;
}) => {
  return (
    <Controller
      name="category_id"
      control={control}
      render={({ field: { onChange } }) => (
        <View>
          <SelectedItem onChangText={onChange} selectedItem="category" />
          {errors.category_id && (
            <View className="flex-row items-center gap-x-1">
              <Text className="text-red-500 text-sm">
                {errors.category_id.message}
              </Text>
            </View>
          )}
        </View>
      )}
    />
  );
};

export default SelectCategoryInBudget;
