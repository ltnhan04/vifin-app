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
import { signInSchema, signInType } from "@/schema/auth.schema";

import images from "@/constants/images";
import icons from "@/constants/icons";

import FormField from "@/components/common/FormField";

export default function Signin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
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
            <Text className="font-rubik text-white text-base mt-4 text-center">
              Welcome to ViFin
            </Text>
            <Text className="font-rubik-bold text-2xl text-white text-center mt-2">
              Sign In
            </Text>
            <Text className="font-rubik text-center text-base text-primary-blue mt-2">
              Smart financial management, start now!
            </Text>
            <View>
              {/* <FormField
                control={control}
                type="email-address"
                placeholder="Enter your email"
                label="Email"
                name="email"
              /> */}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
