import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import SplashScreen from "./splash-screen";
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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
