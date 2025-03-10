import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

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
  const handleDelete = (categoryId: string) => {
    console.log(`Delete category with ID: ${categoryId}`);
  };
  return (
    <TouchableOpacity
      className="flex flex-row items-center py-2 rounded-lg"
      activeOpacity={0.8}
    >
      <Image
        className="size-14 rounded-full border-2 border-[#4FAAFF]"
        source={{ uri: symbol }}
      />
      <Text className="ml-4 text-xl font-rubik-medium text-gray-200">
        {name}
      </Text>

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

          <TouchableOpacity onPress={() => handleDelete(_id)}>
            <Icon name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ParentCategoryItem;
