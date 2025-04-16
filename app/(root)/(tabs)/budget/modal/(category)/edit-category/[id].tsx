import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { CategoryType, categorySchema } from "@/schema/category.schema";
import InputCategoryName from "@/components/common/category/InputCategoryName";
import SelectTransactionType from "@/components/common/category/SelectTransactionType";
import SelectParentCategory from "@/components/common/category/SelectParentCategory";
import ButtonSubmit from "@/components/ui/Button";
import { toast } from "sonner-native";
import Loading from "@/app/loading";

const EditCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading: isFetching } = useGetCategoryQuery(
    { id },
    { skip: !id }
  );
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      symbol: "",
      name: "",
      createdBy: "",
      parent_id: null,
      transaction_type: "expense",
    },
  });

  useEffect(() => {
    if (data?.data && !isEditing) {
      reset({
        symbol: data.data.symbol || "",
        name: data.data.name || "",
        createdBy: data.data.createdBy || "",
        parent_id: data.data.parent_id || null,
        transaction_type: data.data.transaction_type,
      });
    }
  }, [data, reset, isEditing]);

  const onSubmit: SubmitHandler<CategoryType> = async (formData) => {
    try {
      const response = await updateCategory({
        id,
        categoryData: formData,
      }).unwrap();
      console.log(response);
      if (response.data) {
        toast.success("Category updated", {
          description: "Changes saved successfully.",
        });
        setIsEditing(false);
        router.back();
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message;
      console.error("Update Category Error:", errorMessage);
      toast.error("Update failed", {
        description: "We couldn’t save your changes.",
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 16,
          height: "100%",
        }}
      >
        <View
          className="flex flex-col justify-between mt-4"
          style={{ flex: 1 }}
        >
          <View className="flex flex-col gap-y-2">
            <InputCategoryName
              control={control}
              errors={errors}
              disabled={!isEditing || isUpdating}
            />
            <SelectTransactionType
              transactionType={data?.data.transaction_type as string}
              control={control}
            />
            <SelectParentCategory control={control} />
          </View>

          {isEditing ? (
            <ButtonSubmit
              title="Save Changes"
              isLoading={isUpdating}
              isDisabled={isUpdating}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={handleSubmit(onSubmit)}
            />
          ) : (
            <ButtonSubmit
              title="Update Category"
              isLoading={false}
              isDisabled={false}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={() => setIsEditing(true)}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default EditCategory;
