import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { configureReanimatedLogger } from "react-native-reanimated";
import Toast from "react-native-toast-message";

import SplashScreen from "@/app/splash-screen";

import "./global.css";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    configureReanimatedLogger({ strict: false });
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(root)/(tabs)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="splash-screen" />
      </Stack>
      <StatusBar style="dark" />
      <Toast />
    </>
  );
}
