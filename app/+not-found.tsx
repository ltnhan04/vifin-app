import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";

const NotFound = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#06142E", "#1B3358", "#316F95"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <View className="flex items-center justify-center w-full">
        <Image
          source={images.noResult}
          className="w-10/12 h-72"
          resizeMode="contain"
        />

        <Text className="text-3xl font-rubik-bold text-primary-brighterBlue mt-5 text-center">
          Oops! Page Not Found
        </Text>

        <Text className="text-lg text-gray-300 mt-2 text-center px-4">
          The page you are looking for doesn't exist or has been moved.
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/home")}
          activeOpacity={0.8}
          className="mt-6 px-6 py-3 bg-primary-brightBlue rounded-lg shadow-lg"
          style={{
            shadowColor: "#FFF",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <Text className="text-base text-white font-medium">Return Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NotFound;
