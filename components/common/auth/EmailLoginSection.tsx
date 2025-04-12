import React, { useState } from "react";
import { View } from "react-native";
import { toast } from "sonner-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { useLazyGetCustomerQuery } from "@/redux/features/customer/customerApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

import { signInSchema, SignInType } from "@/schema/auth.schema";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

const EmailLoginSection = () => {
  const dispatch = useAppDispatch();
  const [getCustomer] = useLazyGetCustomerQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

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

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const signInUser = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      if (!signInUser.user) {
        throw new Error("User authentication failed");
      }
      const customerId = signInUser.user.uid;
      const [tokenResult, customerResponse] = await Promise.all([
        signInUser.user.getIdTokenResult(),
        getCustomer({ customerId }).unwrap(),
      ]);

      if (!customerResponse?.data) {
        throw new Error("User data not found");
      }
      dispatch(
        setUser({
          token: tokenResult.token,
          user: {
            ...customerResponse.data,
            customerId: customerResponse.data._id || customerId,
          },
        })
      );

      toast.success("Welcome back 👋", {
        description: "You're all set to manage your finances.",
      });
    } catch (error: any) {
      console.error("Sign In Error:", error);
      toast.error("Oops! Something went wrong", {
        description: "Please double-check your info and try again.",
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
        testId="email_id"
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
        testId="password_id"
      />
      <Button
        background="#6BBDE3"
        textColor="white"
        handleOnPress={handleSubmit(onSubmit)}
        title="Login"
        isLoading={isLoading}
      />
    </View>
  );
};

export default EmailLoginSection;
