import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSelectedCategory,
  clearSelectedCategory,
} from "@/redux/features/category/categorySlice";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";

const ParentCategoryItem = ({
  symbol,
  name,
  isOwner,
  _id,
}: {
  symbol: string;
  name: string;
  isOwner: boolean;
  _id: string;
}) => {
  const dispatch = useAppDispatch();
  const selectedCategoryId = useAppSelector(
    (state) => state.category.selectedCategoryId
  );
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const handleDelete = (categoryId: string) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the category "${name}"?`,
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
                text1: "Category has been deleted successfully!",
              });
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete category. Please try again."
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  const handleSelectedCategoryId = () => {
    if (selectedCategoryId === _id) {
      dispatch(clearSelectedCategory());
    } else {
      dispatch(setSelectedCategory(_id));
    }
    router.back();
  };

  return (
    <TouchableOpacity
      className={`flex flex-row items-center p-2 rounded-lg `}
      activeOpacity={0.8}
      onPress={handleSelectedCategoryId}
    >
      <Image
        className="size-14 rounded-full border-2 border-[#4FAAFF]"
        source={{ uri: symbol }}
      />
      <View className="flex-row items-center">
        <Text className="ml-4 text-xl font-medium text-gray-200">{name}</Text>
        {selectedCategoryId === _id && (
          <Icon
            name="checkmark-circle"
            size={24}
            color="#6BBFFF"
            className="ml-2"
          />
        )}
      </View>

      {isOwner && (
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
  );
};

export default ParentCategoryItem;
