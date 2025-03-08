import { router, Stack, useSegments } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeLayout = () => {
  const segment = useSegments();
  const page = segment[segment.length - 1];
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(wallet)"
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

          headerRight: () =>
            page === "create-wallet" ? (
              ""
            ) : (
              <TouchableOpacity
                className="flex-row items-center gap-x-1"
                onPress={() => router.push("/home/create-wallet")}
              >
                <Icon name="add-circle-outline" color="#fff" size={20} />
                <Text className="text-white font-medium text-base">
                  Create Wallet
                </Text>
              </TouchableOpacity>
            ),
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
