import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schema/auth.schema";

import images from "@/constants/images";
import icons from "@/constants/icons";

import FormField from "@/components/common/FormField";

export default function Signin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInType> = (data: SignInType) => {
    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView contentContainerClassName="px-6 py-10">
          <View>
            <Image
              source={images.signIn}
              resizeMode="contain"
              className="w-full"
            />
            <Text className="font-rubik text-white text-lg mt-4 text-center">
              Welcome to ViFin
            </Text>
            <Text className="font-rubik-bold text-3xl text-white text-center mt-2">
              Sign In
            </Text>
            <Text className="font-rubik text-center text-lg text-primary-blue mt-2">
              Smart financial management, start now!
            </Text>
            <View className="gap-y-4 mt-6">
              <FormField
                control={control}
                type="email-address"
                placeholder="Enter your email"
                label="Email"
                name="email"
              />
              <FormField
                control={control}
                type="visible-password"
                placeholder="Enter your password"
                label="Password"
                name="password"
                icon={icons.eyeOpen}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
