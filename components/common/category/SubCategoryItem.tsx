import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";

const SubCategoryItem = ({
  symbol,
  name,
  isSubOwner,
  _id,
}: {
  symbol: string;
  name: string;
  isSubOwner: boolean;
  _id: string;
}) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = (categoryId: string) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the subcategory "${name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteCategory({ id: categoryId }).unwrap();
              Toast.show({
                type: "success",
                text1: "Subcategory has been deleted successfully!",
              });
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete subcategory. Please try again."
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex-row items-center">
      <View className="w-4">
        <View className="border-t-2 border-[#4FAAFF] w-6" />
      </View>

      <TouchableOpacity
        className="flex flex-row items-center py-3 px-4 rounded-lg w-full"
        activeOpacity={0.8}
      >
        <Image
          className="size-12 rounded-full border border-[#4FAAFF]"
          source={{ uri: symbol }}
        />
        <Text className="ml-4 text-lg font-rubik-medium text-gray-200">
          {name}
        </Text>

        {isSubOwner && (
          <View className="flex-row ml-auto gap-x-4">
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/(root)/(tabs)/budget/modal/(category)/edit-category/${_id}`
                )
              }
            >
              <Icon name="create-outline" size={24} color="yellow" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(_id)}
              disabled={isLoading}
            >
              <Icon
                name="trash-outline"
                size={24}
                color={isLoading ? "gray" : "red"}
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SubCategoryItem;
