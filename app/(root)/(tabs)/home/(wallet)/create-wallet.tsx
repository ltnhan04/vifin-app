import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useCreateNewWalletMutation } from "@/redux/features/wallet/walletApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

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
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <SafeAreaView style={[androidSafeArea.androidSafeArea, { flex: 1 }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>
              <InputWalletName
                disabled={isLoading}
                control={control}
                errors={errors}
              />
              <SelectCurrencyUnit control={control} errors={errors} />
              <InputWalletAmount
                disabled={isLoading}
                control={control}
                errors={errors}
              />
              <View style={{ marginTop: "auto" }}>
                <ButtonSubmit
                  title="Save"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  background="#6BBFFF"
                  textColor="white"
                  handleOnPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateWallet;
