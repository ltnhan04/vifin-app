import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const WalletLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Your Wallet",
          headerTitleAlign: "center",
          headerBackground() {
            return <View className="bg-primary-dark flex-1" />;
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity
              className="flex-row items-center gap-x-1"
              onPress={() => router.push("/home/create-wallet")}
            >
              <Icon name="add-circle-outline" color="#6BBFFF" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="create-wallet"
        options={{
          headerTitle: "Create Wallet",
          headerTitleAlign: "center",
          headerBackground() {
            return <View className="bg-primary-dark flex-1" />;
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="edit-wallet/[id]"
        options={{
          headerTitle: "Edit Wallet",
          headerTitleAlign: "center",
          headerBackground() {
            return <View className="bg-primary-dark flex-1" />;
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
};

export default WalletLayout;
