import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ButtonSubmit from "@/components/ui/Button";
import Icon from "react-native-vector-icons/Ionicons";
import SelectCategory from "@/components/common/transactions/SelectCategory";
import WalletPickerBottom from "@/components/common/budget/WalletPickerBottom";
import {
  transactionSchema,
  TransactionType,
} from "@/schema/transaction.schema";
import { useCreateTransactionMutation } from "@/redux/features/transaction/transactionApi";
import InputAmount from "@/components/common/transactions/InputAmount";
import SelectWallet from "@/components/common/transactions/SelectWallet";
import SelectTransactionType from "@/components/common/transactions/SelectTransactionType";

const CreateTransaction = ({
  handleCloseModal,
}: {
  handleCloseModal?: () => void;
}) => {
  const walletRef = useRef<BottomSheet>(null);
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category_id: "",
      transaction_type: "expense",
      wallet_id: "",
    },
  });
  const onSubmit: SubmitHandler<TransactionType> = async (data) => {
    try {
      const response = await createTransaction(data).unwrap();
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        router.back();
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={`${Platform.OS === "ios" ? "padding" : "height"}`}
      >
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView
            contentContainerClassName="px-6 pb-6 h-full"
            style={{ flex: 1 }}
          >
            <View
              className="flex flex-col justify-between mt-4"
              style={{ flex: 1 }}
            >
              {handleCloseModal && (
                <View className="w-full bg-primary-dark">
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    className="self-end"
                  >
                    <Icon name="close-outline" size={28} color={"white"} />
                  </TouchableOpacity>
                </View>
              )}
              <View className="flex flex-col gap-y-2">
                <SelectCategory control={control} errors={errors} />
                <InputAmount
                  control={control}
                  errors={errors}
                  disabled={isLoading}
                />
                <SelectTransactionType
                  control={control}
                  transactionType="expense"
                />
                <SelectWallet
                  control={control}
                  errors={errors}
                  expand={() => walletRef.current?.expand()}
                />
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
          <WalletPickerBottom
            type="transaction"
            bottomRef={walletRef}
            control={control}
          />
        </LinearGradient>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default CreateTransaction;
