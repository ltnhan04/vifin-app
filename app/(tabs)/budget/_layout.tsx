import React from "react";
import { Stack } from "expo-router";

const BudgetLayout = () => {
  const flag = true;

  return flag ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(top-tabs)" />
    </Stack>
  );
};

export default BudgetLayout;
