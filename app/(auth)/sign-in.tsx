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
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FirebaseError } from "firebase/app";
import Toast from "react-native-toast-message";

import { signInSchema, SignInType } from "@/schema/auth.schema";
import images from "@/constants/images";
import icons from "@/constants/icons";

import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";
GoogleSignin.configure({
  webClientId:
    "739948025106-tui8caj4m6s16s67nfnru21cd625ptrr.apps.googleusercontent.com",
});
export default function Signin() {
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
      const loginUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      Toast.show({
        type: "success",
        text1: "Sign In Successfully!",
      });
      if (loginUser.user) {
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

  // const onGoogleButtonPress = async () => {
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   const signInResult = await GoogleSignin.signIn();

  //   const { idToken } = signInResult.data;
  //   if (!idToken) {
  //     console.log("No ID token found");
  //   }

  //   const googleCredential =
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView contentContainerClassName="px-6 py-10">
            <View>
              <Image
                source={images.signIn}
                resizeMode="contain"
                className="max-w-md mx-auto"
              />
              <Text className="font-rubik text-white text-lg text-center mt-6">
                Welcome to ViFin
              </Text>
              <Text className="font-rubik-bold text-3xl text-white text-center mt-2">
                Sign In
              </Text>
              <Text className="font-rubik text-center text-lg text-primary-blue mt-2">
                Smart financial management, start now!
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
                  isSecure={!isShowingPassword}
                  placeholder="Enter your password"
                  handleShowingPassword={() =>
                    setIsShowingPassword(!isShowingPassword)
                  }
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
              <View>
                <Text className=" font-rubik text-lg text-secondary-gray text-center mt-6">
                  Don’t have an account?{" "}
                  <Link
                    href={"/(auth)/sign-up"}
                    className=" font-rubik-bold text-primary-brightBlue"
                  >
                    Sign Up
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
}
