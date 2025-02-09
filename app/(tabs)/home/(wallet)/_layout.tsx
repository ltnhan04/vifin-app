import { Stack } from "expo-router";

const WalletLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="create-wallet" options={{ headerShown: false }} />
      <Stack.Screen name="edit-wallet" options={{ headerShown: false }} />
    </Stack>
  );
};

export default WalletLayout;
