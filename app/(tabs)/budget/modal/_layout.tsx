import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

const ModalLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Add Budget",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="font-rubik-medium text-base text-black">
                  Cancel
                </Text>
              </TouchableOpacity>
            );
          },
          title: "Add Budget",
        }}
      />
      <Stack.Screen name="(category)" options={{ headerShown: false }} />
      <Stack.Screen name="selected-calendar" />
    </Stack>
  );
};

export default ModalLayout;
