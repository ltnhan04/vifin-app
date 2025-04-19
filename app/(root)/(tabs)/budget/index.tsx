import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ButtonSubmit from "@/components/ui/Button";
import images from "@/constants/images";
import androidSafeArea from "@/utils/android-safe-area";

const BudgetScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <View className="min-h-[80vh] flex items-center justify-center px-6 py-10">
          <Image
            source={images.emptyBox}
            resizeMode="contain"
            className="size-40"
          />
          <Text className=" font-rubik-medium text-xl text-white mt-4">
            You have no budget
          </Text>
          <Text className="font-rubik-medium text-base text-center mt-2 mb-4 text-secondary-gray-100">
            Start saving money by creating budgets and we will help you stick to
            it.
          </Text>
          <ButtonSubmit
            background="#6BBDE3"
            title="Create a Budget"
            textColor="white"
            handleOnPress={() => router.push("/budget/modal")}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BudgetScreen;
