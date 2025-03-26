import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useGetBudgetByIdQuery,
  useUpdateBudgetMutation,
} from "@/redux/features/budget/budgetApi";
import { budgetSchema, BudgetType } from "@/schema/budget.schema";
import ButtonSubmit from "@/components/ui/Button";
import androidSafeArea from "@/utils/android-safe-area";
import SelectCategory from "@/components/common/budget/SelectCategoryInBudget";
import InputBudgetAmount from "@/components/common/budget/InputBudgetAmount";
import RepeatBudget from "@/components/common/budget/RepeatBudget";
import DatePickerBottom from "@/components/common/budget/DatePickerBottom";
import SelectDateRangeBudget from "@/components/common/budget/SelectDateRangeBudget";
import SelectWalletInBudget from "@/components/common/budget/SelectWalletInBudget";
import WalletPickerBottom from "@/components/common/budget/WalletPickerBottom";

const EditBudget = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomRef = useRef<BottomSheet>(null);
  const walletRef = useRef<BottomSheet>(null);

  const { data: budgetData, isLoading } = useGetBudgetByIdQuery(
    { id: id as string },
    { skip: !id }
  );
  const [updateBudget, { isLoading: isUpdating }] = useUpdateBudgetMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BudgetType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category_id: "",
      wallet_id: "",
      startDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      amount: 0,
      repeat_type: "weekly",
      is_repeated: true,
      is_completed: false,
    },
  });

  useEffect(() => {
    if (budgetData) {
      setValue("category_id", budgetData.data.category_id);
      setValue("wallet_id", budgetData.data.wallet_id);
      setValue("startDate", new Date(budgetData.data.startDate));
      setValue("dueDate", new Date(budgetData.data.dueDate));
      setValue("amount", budgetData.data.amount);
      setValue(
        "repeat_type",
        budgetData.data.repeat_type as
          | "custom"
          | "monthly"
          | "weekly"
          | "yearly"
      );
      setValue("is_repeated", budgetData.data.is_repeated);
      setValue("is_completed", budgetData.data.is_completed);
    }
  }, [budgetData, setValue]);

  const onSubmit: SubmitHandler<BudgetType> = async (data) => {
    try {
      const response = await updateBudget({
        id,
        newBudget: { ...data },
      }).unwrap();
      if (response.data) {
        Toast.show({ type: "success", text1: "Budget updated successfully!" });
      }
      router.back();
    } catch (error) {
      console.error("Error updating budget:", error);
      Toast.show({ type: "error", text1: "Failed to update budget." });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6BBFFF" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <View
                className="flex flex-col justify-between"
                style={{ flex: 1 }}
              >
                <View className="flex flex-col gap-y-3">
                  <SelectCategory control={control} errors={errors} />
                  <InputBudgetAmount
                    control={control}
                    disabled={isUpdating}
                    errors={errors}
                  />
                  <SelectDateRangeBudget
                    expand={() => bottomRef.current?.expand()}
                    control={control}
                    errors={errors}
                  />
                  <SelectWalletInBudget
                    expand={() => walletRef.current?.expand()}
                    control={control}
                    errors={errors}
                  />
                  <RepeatBudget control={control} />
                </View>
                <ButtonSubmit
                  title="Update"
                  isLoading={isUpdating}
                  isDisabled={isUpdating}
                  background="#6BBFFF"
                  textColor="white"
                  handleOnPress={handleSubmit(onSubmit)}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
          <DatePickerBottom bottomRef={bottomRef} control={control} />
          <WalletPickerBottom
            type="budget"
            bottomRef={walletRef}
            control={control}
          />
        </LinearGradient>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default EditBudget;
