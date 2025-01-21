import React, { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "@/redux/hooks";

import { signInSchema, SignInType } from "@/schema/auth.schema";

import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { setUser } from "@/redux/features/auth/authSlice";

const EmailLoginSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInType> = async (data: SignInType) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const loginUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      Toast.show({
        type: "success",
        text1: "Sign In Successfully!",
      });
      if (loginUser.user) {
        dispatch(setUser(loginUser.user));
        router.push("/(root)/(tabs)/home");
      }
    } catch (error: any) {
      const err = error as FirebaseError;
      Toast.show({
        type: "error",
        text1: "Sign In Failed: " + err.message,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <View className="gap-y-4 mt-4">
      <FormField
        control={control}
        isDisabled={isLoading}
        error={errors}
        type="email-address"
        placeholder="Enter your email"
        label="Email"
        name="email"
      />
      <FormField
        control={control}
        isDisabled={isLoading}
        error={errors}
        type="visible-password"
        isSecure={!isShowingPassword}
        placeholder="Enter your password"
        handleShowingPassword={() => setIsShowingPassword(!isShowingPassword)}
        label="Password"
        name="password"
        icon={isShowingPassword ? "eye-slash" : "eye"}
      />
      <Button
        background="#6BBDE3"
        textColor="white"
        handleOnPress={handleSubmit(onSubmit)}
        title="Sign In"
        isLoading={isLoading}
      />
    </View>
  );
};

export default EmailLoginSection;
