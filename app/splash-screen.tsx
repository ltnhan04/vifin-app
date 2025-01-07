import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import images from "@/constants/images";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <View className="flex-1 bg-primary-dark justify-center items-center">
      <Animated.Image
        source={images.splash}
        resizeMode={"contain"}
        style={{
          width: "100%",
          height: "100%",
          opacity: fadeAnim,
        }}
      />
    </View>
  );
};

export default SplashScreen;
