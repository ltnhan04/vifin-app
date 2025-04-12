import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { toast } from "sonner-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useCreateNewCustomerMutation } from "@/redux/features/customer/customerApi";

import { signUpSchema, SignUpType } from "@/schema/auth.schema";
import images from "@/constants/images";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import GoogleLoginSection from "@/components/common/auth/GoogleLoginSection";
import androidSafeArea from "@/utils/android-safe-area";
import RadioSection from "@/components/common/settings/RadioSection";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [createNewCustomer] = useCreateNewCustomerMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState<{
    [key: string]: boolean;
  }>({});

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
      gender: "male",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const createUser = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (createUser.user) {
        const providerData = createUser.user.providerData.find(
          (value) => value.providerId
        );
        if (providerData) {
          const newUser = {
            full_name: data.name,
            avatar: providerData.photoURL,
            gender: data.gender,
            email: providerData?.email,
            provider: providerData.providerId,
          };
          const tokenResult = await createUser.user.getIdTokenResult();
          const response = await createNewCustomer(newUser).unwrap();
          dispatch(
            setUser({
              token: tokenResult.token,
              user: { ...response.data, customerId: response.data._id },
            })
          );
          toast.success("Welcome back 👋", {
            description: "You're all set to manage your finances.",
          });
        }
      }
    } catch (error: any) {
      const err = error as FirebaseError;
      console.error(err);
      toast.error("Oops! Something went wrong", {
        description: "Please double-check your info and try again.",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={`${Platform.OS === "android" ? "height" : "padding"}`}
    >
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView
            contentContainerClassName="px-6 py-10"
            showsVerticalScrollIndicator={false}
          >
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
                  isDisabled={isLoading}
                  error={errors}
                  type="default"
                  placeholder="Enter your username"
                  label="Name"
                  name="name"
                />
                <View>
                  <Text className="font-rubik-medium text-lg text-secondary-gray">
                    Gender
                  </Text>
                  <RadioSection name="gender" control={control} type="signUp" />
                </View>
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
                  error={errors}
                  isDisabled={isLoading}
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
                  isDisabled={isLoading}
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
                    href={"/(root)/(auth)/sign-in"}
                    className=" font-rubik-bold text-primary-brightBlue"
                  >
                    Sign In
                  </Link>
                </Text>
              </View>
              <GoogleLoginSection />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
