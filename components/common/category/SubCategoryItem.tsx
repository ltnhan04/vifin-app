import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

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
  const handleDelete = (categoryId: string) => {
    console.log(`Delete category with ID: ${categoryId}`);
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

            <TouchableOpacity onPress={() => handleDelete(_id)}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SubCategoryItem;
