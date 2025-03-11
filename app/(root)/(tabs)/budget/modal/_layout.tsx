import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";

const ModalLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerBackground: () => (
            <View className="bg-primary-dark" style={{ flex: 1 }}></View>
          ),
          headerTitle: "Add Budget",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
            color: "#fff",
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="font-rubik-medium text-base text-white">
                  Cancel
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="(category)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ModalLayout;
