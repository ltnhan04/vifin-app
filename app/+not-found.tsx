import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";

const NotFound = () => {
  const router = useRouter();
  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <View
        className="flex flex-col items-center justify-center my-5"
        style={{ flex: 1 }}
      >
        <Image
          source={images.noResult}
          className="w-11/12 h-80"
          resizeMode="contain"
        />
        <Text className="text-2xl font-rubik-bold text-primary-brighterBlue mt-5">
          404 - Screen Not Found
        </Text>
        <TouchableOpacity
          className="bg-primary-brightBlue mt-5 px-5 py-3 rounded-lg"
          onPress={() => router.replace("/(root)/(tabs)/home")}
        >
          <Text className="text-base text-white font-medium">Return Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NotFound;
