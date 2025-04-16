import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useGetWalletQuery,
  useUpdateWalletMutation,
} from "@/redux/features/wallet/walletApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";
import { router, useLocalSearchParams } from "expo-router";
import ButtonSubmit from "@/components/ui/Button";
import { WalletType, walletSchema } from "@/schema/wallet.schema";
import InputWalletName from "@/components/common/wallet/InputWalletName";
import SelectCurrencyUnit from "@/components/common/wallet/SelectCurrencyUnit";
import InputWalletAmount from "@/components/common/wallet/InputWalletAmount";
import Loading from "@/app/loading";
import { LinearGradient } from "expo-linear-gradient";

const EditWallet = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading: isFetching } = useGetWalletQuery(
    { id },
    { skip: !id }
  );
  const [updateWallet, { isLoading: isUpdating }] = useUpdateWalletMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WalletType>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      symbol: "",
      wallet_name: "",
      currency_unit: "VND",
      amount: 0,
    },
  });

  useEffect(() => {
    if (data?.data && !isEditing) {
      reset({
        symbol: data.data.symbol || "",
        wallet_name: data.data.wallet_name || "",
        currency_unit: "VND",
        amount: Number(data.data.amount) || 0,
      });
    }
  }, [data, reset, isEditing]);

  const onSubmit: SubmitHandler<WalletType> = async (formData) => {
    try {
      const response = await updateWallet({
        id,
        newWallet: formData,
      }).unwrap();
      if (response.data) {
        toast.success("Wallet updated", {
          description: "Your changes were saved.",
        });
        setIsEditing(false);
        router.back();
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message;
      console.error(errorMessage);
      toast.error("Failed to update wallet", {
        description: "Please try again.",
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
          paddingBottom: 24,
          height: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <InputWalletName
          disabled={isUpdating || !isEditing}
          control={control}
          errors={errors}
        />
        <SelectCurrencyUnit control={control} errors={errors} />
        <InputWalletAmount
          disabled={isUpdating || !isEditing}
          control={control}
          errors={errors}
        />

        {isEditing ? (
          <View style={{ marginTop: "auto" }}>
            <ButtonSubmit
              title="Save Changes"
              isLoading={isUpdating}
              isDisabled={isUpdating}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={handleSubmit(onSubmit)}
            />
          </View>
        ) : (
          <View style={{ marginTop: "auto" }}>
            <ButtonSubmit
              title="Update Wallet"
              isLoading={false}
              isDisabled={false}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={() => setIsEditing(true)}
            />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default EditWallet;
