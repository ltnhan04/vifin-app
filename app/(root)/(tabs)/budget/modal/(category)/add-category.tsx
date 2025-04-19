import React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import { CategoryType, categorySchema } from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hooks";
import ButtonSubmit from "@/components/ui/Button";
import { toast } from "sonner-native";
import InputCategoryName from "@/components/common/category/InputCategoryName";
import SelectTransactionType from "@/components/common/category/SelectTransactionType";
import SelectParentCategory from "@/components/common/category/SelectParentCategory";
import { router } from "expo-router";

const AddCategory = () => {
  const customerId = useAppSelector((state) => state.auth.user?.customerId);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    try {
      const response = await createCategory({
        ...data,
        createdBy: customerId,
      }).unwrap();
      if (response.data) {
        toast.success("Category created!", {
          description: "You’re now one step closer to better budgeting 💡",
        });
      }
      router.back();
    } catch (error) {
      console.error("Create Category Error:", error);
      toast.error("Couldn’t create category", {
        description: "Please try again later.",
      });
    }
  };
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
              disabled={isLoading}
            />
            <SelectTransactionType control={control} />
            <SelectParentCategory control={control} />
          </View>

          <ButtonSubmit
            title="Save"
            isLoading={isLoading}
            isDisabled={isLoading}
            background="#6BBFFF"
            textColor="white"
            handleOnPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AddCategory;
