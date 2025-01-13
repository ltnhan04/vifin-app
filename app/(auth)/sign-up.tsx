import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import Toast from "react-native-toast-message";

import { signUpSchema, SignUpType } from "@/schema/auth.schema";

import images from "@/constants/images";
import icons from "@/constants/icons";

import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";

const SignUp = () => {
  const router = useRouter();
  const [isShowingPassword, setIsShowingPassword] = useState<{
    [key: string]: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      Toast.show({
        type: "success",
        text1: "Sign Up Successfully!",
      });
      if (createUser.user) {
        router.push("/(root)/(tabs)/home");
      }
    } catch (error: any) {
      const err = error as FirebaseError;
      Toast.show({
        type: "error",
        text1: "Registration failed: " + err.message,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView contentContainerClassName="px-6 py-10">
            <View>
              <Image
                source={images.signUp}
                resizeMode="contain"
                className="max-w-md mx-auto"
              />
              <Text className="font-rubik text-white text-lg text-center mt-6">
                Welcome to ViFin
              </Text>
              <Text className="font-rubik-bold text-3xl text-white text-center mt-2">
                Sign Up
              </Text>
              <Text className="font-rubik text-center text-lg text-primary-blue mt-2">
                Take control of your finances with ease!
              </Text>
              <View className="gap-y-4 mt-4">
                <FormField
                  control={control}
                  error={errors}
                  type="email-address"
                  placeholder="Enter your email"
                  label="Email"
                  name="email"
                />
                <FormField
                  control={control}
                  error={errors}
                  type="visible-password"
                  isSecure={!isShowingPassword["password"]}
                  placeholder="Enter your password"
                  handleShowingPassword={() =>
                    setIsShowingPassword((prev) => ({
                      ...prev,
                      ["password"]: !prev["password"],
                    }))
                  }
                  label="Password"
                  name="password"
                  icon={isShowingPassword["password"] ? "eye-slash" : "eye"}
                />
                <FormField
                  control={control}
                  error={errors}
                  type="visible-password"
                  isSecure={!isShowingPassword["confirmPassword"]}
                  placeholder="Enter your confirm password"
                  handleShowingPassword={() =>
                    setIsShowingPassword((prev) => ({
                      ...prev,
                      ["confirmPassword"]: !prev["confirmPassword"],
                    }))
                  }
                  label="Confirm Password"
                  name="confirmPassword"
                  icon={
                    isShowingPassword["confirmPassword"] ? "eye-slash" : "eye"
                  }
                />
                <Button
                  background="#6BBDE3"
                  textColor="white"
                  handleOnPress={handleSubmit(onSubmit)}
                  title="Sign Up"
                  isLoading={isLoading}
                />
              </View>
              <View>
                <Text className=" font-rubik text-lg text-secondary-gray text-center mt-6">
                  Have an account?{" "}
                  <Link
                    href={"/(auth)/sign-in"}
                    className=" font-rubik-bold text-primary-brightBlue"
                  >
                    Sign In
                  </Link>
                </Text>
              </View>
              <Button
                icon={icons.google}
                handleOnPress={() => {}}
                isLoading={isLoading}
                textColor="black"
                background="#F3F4F6"
                title="Continue with Google"
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
