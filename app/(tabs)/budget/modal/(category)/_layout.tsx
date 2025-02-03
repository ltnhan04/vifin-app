import { Stack } from "expo-router";

const CategoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="selected-categories"
        options={{
          headerTitle: "Select Category",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 18,
          },
          headerSearchBarOptions: {
            placeholder: "Search category",
            hideWhenScrolling: false,
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
    </Stack>
  );
};

export default CategoryLayout;
