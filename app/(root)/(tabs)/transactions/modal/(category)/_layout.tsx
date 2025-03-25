import { Stack } from "expo-router";
import { View } from "react-native";

const CategoryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackground: () => (
          <View className="bg-primary-dark" style={{ flex: 1 }}></View>
        ),
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="list-category"
        options={{
          headerTitle: "Select Category",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
            color: "#fff",
          },
          headerSearchBarOptions: {
            placeholder: "Search category",
            hideWhenScrolling: false,
            headerIconColor: "#fff",
            tintColor: "#fff",
            textColor: "#fff",
            hintTextColor: "#ccc",
          },
        }}
      />
      <Stack.Screen
        name="add-category"
        options={{
          headerTitle: "New Category",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="edit-category/[id]"
        options={{
          headerTitle: "Edit Category",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
};

export default CategoryLayout;
