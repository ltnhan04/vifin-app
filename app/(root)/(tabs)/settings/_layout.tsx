import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SettingsLayout = () => {
  const router = useRouter();
  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            headerTitle: "Edit Profile",
            headerTitleStyle: {
              color: "#fff",
              fontFamily: "Rubik",
              fontWeight: "800",
            },
            headerTitleAlign: "center",
            headerBlurEffect: "regular",
            headerTransparent: true,
            headerBackground: () => (
              <View className="bg-primary-dark" style={{ flex: 1 }}></View>
            ),
            headerTintColor: "#081657",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Icon
                  color={"#fff"}
                  name="chevron-back-circle-outline"
                  size={28}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="categories" />
      </Stack>
    </LinearGradient>
  );
};

export default SettingsLayout;
