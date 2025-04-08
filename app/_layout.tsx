import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { configureReanimatedLogger } from "react-native-reanimated";
import { Toaster } from "sonner-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { store, persistor } from "../redux/store";
import AuthListener from "@/utils/AuthListener";
import SplashScreen from "@/app/splash-screen";
import "./global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });
  }, []);
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
    if (!fontsLoaded) return;
    configureReanimatedLogger({ strict: false });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthListener>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(root)" />
              <Stack.Screen name="splash-screen" />
            </Stack>
            <Toaster />
            <StatusBar style="inverted" />
          </AuthListener>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
