import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const SettingsLayout = () => {
  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </LinearGradient>
  );
};

export default SettingsLayout;
