import { View, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { toast } from "sonner-native";
import { useLocalSearchParams } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import ButtonSubmit from "@/components/ui/Button";
import {
  transactionSchema,
  TransactionType,
} from "@/schema/transaction.schema";
import {
  useGetDetailsTransactionQuery,
  useUpdateTransactionMutation,
} from "@/redux/features/transaction/transactionApi";
import InputAmount from "@/components/common/transactions/InputAmount";
import SelectWallet from "@/components/common/transactions/SelectWallet";
import SelectTransactionType from "@/components/common/transactions/SelectTransactionType";
import SelectCategory from "@/components/common/transactions/SelectCategory";
import Loading from "@/app/loading";
import WalletPickerBottom from "@/components/common/budget/WalletPickerBottom";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const EditTransaction = () => {
  const [isEditing, setIsEditing] = useState(false);
  const walletRef = useRef<BottomSheet>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading: isFetching } = useGetDetailsTransactionQuery(
    { id },
    { skip: !id }
  );

  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category_id: "",
      transaction_type: "expense",
      wallet_id: "",
    },
  });

  useEffect(() => {
    if (data?.data && !isEditing) {
      reset({
        amount: data?.data.amount || 0,
        category_id: data?.data.category_id || "",
        transaction_type: data?.data.transaction_type as "expense" | "income",
        wallet_id: data?.data.wallet_id || "",
      });
    }
  }, [data, reset, isEditing]);

  const onSubmit: SubmitHandler<TransactionType> = async (data) => {
    try {
      const response = await updateTransaction({
        id,
        updateTransaction: data,
      }).unwrap();
      if (response.data) {
        toast.success("Transaction updated", {
          description: "Your spending info was updated.",
        });
      }
    } catch (error) {
      console.error("Update Transaction Error:", error);
      toast.error("Update failed", {
        description: "Try again later.",
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 16,
            height: "100%",
          }}
        >
          <View
            className="flex flex-col justify-between mt-8"
            style={{ flex: 1 }}
          >
            <View className="flex flex-col gap-y-2">
              <SelectCategory control={control} errors={errors} />
              <InputAmount
                control={control}
                errors={errors}
                disabled={!isEditing || isUpdating}
              />
              <SelectTransactionType
                transactionType={data?.data.transaction_type as string}
                control={control}
              />

              <SelectWallet
                control={control}
                errors={errors}
                expand={() => walletRef.current?.expand()}
              />
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
                title="Update Transaction"
                isLoading={false}
                isDisabled={false}
                background="#6BBFFF"
                textColor="white"
                handleOnPress={() => setIsEditing(true)}
              />
            )}
          </View>
        </ScrollView>
        <WalletPickerBottom
          type="transaction"
          bottomRef={walletRef}
          control={control}
        />
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default EditTransaction;
