import { Stack } from "expo-router";

const BudgetLayout = () => {
  const flag = true;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {flag ? (
        <Stack.Screen name="index" />
      ) : (
        <Stack.Screen name="(top-tabs)" />
      )}
    </Stack>
  );
};

export default BudgetLayout;
