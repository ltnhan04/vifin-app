import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCreateBudgetMutation } from "@/redux/features/budget/budgetApi";
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

const AddBudget = () => {
  const bottomRef = useRef<BottomSheet>(null);
  const walletRef = useRef<BottomSheet>(null);
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
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      amount: 0,
      repeat_type: "weekly",
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
                    disabled={isLoading}
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
                  title="Save"
                  isLoading={false}
                  isDisabled={false}
                  background="#6BBFFF"
                  textColor="white"
                  handleOnPress={handleSubmit(onSubmit)}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
          <DatePickerBottom bottomRef={bottomRef} control={control} />
          <WalletPickerBottom bottomRef={walletRef} control={control} />
        </LinearGradient>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default AddBudget;
