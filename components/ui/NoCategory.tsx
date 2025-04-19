import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import images from "@/constants/images";

const NoCategory = () => {
  return (
    <View className="flex flex-col items-center justify-center mt-[35%]">
      <Image
        source={images.noCategory}
        resizeMode="contain"
        className="w-60 h-60 opacity-90"
      />
      <Text className="text-2xl text-white font-semibold">
        No categories yet! 🎭
      </Text>
      <Text className="text-lg text-white text-center px-8 mt-2">
        Organize your spending smartly! Add a category now. 🛠️
      </Text>
      <TouchableOpacity
        className="mt-6 bg-primary px-6 py-3 rounded-lg bg-primary-brighterBlue shadow-lg"
        onPress={() =>
          router.push("/(root)/(tabs)/budget/modal/(category)/add-category")
        }
      >
        <Text className="text-white text-lg font-bold">Add Category</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoCategory;
