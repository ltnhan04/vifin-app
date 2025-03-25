import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TransactionType } from "@/schema/transaction.schema";
import SelectedItem from "@/components/ui/SelectedItem";
import { useAppSelector } from "@/redux/hooks";
import { useGetCategoryQuery } from "@/redux/features/category/categoryApi";

const SelectCategory = ({
  control,
  errors,
}: {
  control: Control<TransactionType>;
  errors: FieldErrors<TransactionType>;
}) => {
  const selectedCategoryId = useAppSelector(
    (state) => state.category.selectedCategoryId
  );

  const { data } = useGetCategoryQuery(
    { id: selectedCategoryId as string },
    { skip: !selectedCategoryId }
  );

  const categoryName = selectedCategoryId ? data?.data.name : null;
  const symbol = selectedCategoryId ? data?.data.symbol : null;

  return (
    <Controller
      name="category_id"
      control={control}
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (selectedCategoryId && selectedCategoryId !== value) {
            onChange(selectedCategoryId);
          }
        }, [selectedCategoryId]);

        return (
          <View className="flex flex-col gap-y-2">
            <SelectedItem
              categoryName={categoryName as string}
              symbol={symbol as string}
              selectedItem="category"
            />
            {errors.category_id && (
              <View className="flex-row items-center ml-16">
                <Text className="text-secondary-red font-medium text-sm">
                  {errors.category_id.message}
                </Text>
              </View>
            )}
          </View>
        );
      }}
    />
  );
};
export default SelectCategory;
