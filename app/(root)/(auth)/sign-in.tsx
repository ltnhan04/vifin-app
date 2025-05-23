import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import images from "@/constants/images";
import EmailSection from "@/components/common/auth/EmailLoginSection";
import GoogleSection from "@/components/common/auth/GoogleLoginSection";
import androidSafeArea from "@/utils/android-safe-area";

export default function Signin() {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={{ flex: 1 }}
      behavior={`${Platform.OS === "android" ? "height" : "padding"}`}
    >
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
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
              <EmailSection />
              <View>
                <Text className=" font-rubik text-lg text-secondary-gray text-center mt-6">
                  Don’t have an account?{" "}
                  <Link
                    href={"/(root)/(auth)/sign-up"}
                    className=" font-rubik-bold text-primary-brightBlue"
                  >
                    Sign Up
                  </Link>
                </Text>
              </View>
              <GoogleSection />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
