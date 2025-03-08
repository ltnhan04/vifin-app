import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useCreateNewWalletMutation } from "@/redux/features/wallet/walletApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import androidSafeArea from "@/utils/android-safe-area";
import ButtonSubmit from "@/components/ui/Button";
import { WalletType, walletSchema } from "@/schema/wallet.schema";
import InputWalletName from "@/components/common/wallet/InputWalletName";
import SelectCurrencyUnit from "@/components/common/wallet/SelectCurrencyUnit";
import InputWalletAmount from "@/components/common/wallet/InputWalletAmount";

const CreateWallet = () => {
  const [createNewWallet, { isLoading }] = useCreateNewWalletMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletType>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      symbol: "",
      wallet_name: "",
      currency_unit: "VND",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<WalletType> = async (data) => {
    try {
      const response = await createNewWallet(data).unwrap();
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <ScrollView
          contentContainerClassName="px-6 pb-6 h-full"
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col justify-between" style={{ flex: 1 }}>
            <View>
              <InputWalletName control={control} errors={errors} />
              <SelectCurrencyUnit control={control} errors={errors} />
              <InputWalletAmount control={control} errors={errors} />
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateWallet;
