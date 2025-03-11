import {
  View,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useCreateBudgetMutation } from "@/redux/features/budget/budgetApi";
import SelectedItem from "@/components/ui/SelectedItem";
import { budgetSchema, BudgetType } from "@/schema/budget.schema";
import ButtonSubmit from "@/components/ui/Button";
import androidSafeArea from "@/utils/android-safe-area";
import SelectCategory from "@/components/common/budget/SelectCategoryInBudget";

const AddBudget = () => {
  const [isReminder, setIsReminder] = useState(false);
  const [createBudget, { isLoading }] = useCreateBudgetMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category_id: "",
      wallet_id: "",
      startDate: new Date(),
      dueDate: new Date(),
      amount: 0,
      repeatType: "weekly",
      is_repeated: true,
      is_completed: false,
    },
  });

  const onSubmit: SubmitHandler<BudgetType> = async (data) => {
    try {
      const response = await createBudget(data).unwrap();
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
      }
      router.back();
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={`${Platform.OS === "ios" ? "padding" : "height"}`}
    >
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <SafeAreaView style={androidSafeArea.androidSafeArea}>
          <ScrollView
            contentContainerClassName="px-6 pb-6 h-full"
            style={{ flex: 1 }}
          >
            <View className="flex flex-col justify-between" style={{ flex: 1 }}>
              <View className="flex flex-col gap-y-3">
                <SelectCategory control={control} errors={errors} />
                <SelectedItem selectedItem="amount" />
                <SelectedItem selectedItem="dueDate" />
                <SelectedItem selectedItem="wallet" />
                <View className="flex flex-row items-center justify-between border-b border-secondary-gray-100 py-4">
                  <View>
                    <Text className="font-rubik-semibold text-base text-white">
                      Repeat this budget
                    </Text>
                    <Text className="font-rubik-medium text-sm text-secondary-gray-100">
                      Budget will renew automatically.
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#6BBFFF" }}
                    thumbColor={isReminder ? "#fff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(prevState) => setIsReminder(!!prevState)}
                    value={isReminder}
                  />
                </View>
              </View>
              <ButtonSubmit
                title="Save"
                isLoading={false}
                isDisabled={true}
                background="#6BBFFF"
                textColor="white"
                handleOnPress={handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AddBudget;
