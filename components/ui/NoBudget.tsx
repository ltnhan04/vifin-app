import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import images from "@/constants/images";

const NoBudget = () => {
  return (
    <View className="flex flex-col items-center justify-center mt-[35%]">
      <Image
        source={images.noBudget}
        resizeMode="contain"
        className="w-60 h-60 opacity-90"
      />
      <Text className="text-xl text-gray-600 font-semibold mt-4">
        No budget set yet! 📉
      </Text>
      <Text className="text-base text-gray-700 text-center px-8 mt-2">
        Stay on track with your finances. Start by adding a budget now! 🚀
      </Text>
      <TouchableOpacity
        className="mt-6 bg-primary px-6 py-3 rounded-lg bg-primary-brighterBlue shadow-lg"
        onPress={() => router.push("/(root)/(tabs)/budget/modal")}
      >
        <Text className="text-white text-lg font-bold">Add Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoBudget;
