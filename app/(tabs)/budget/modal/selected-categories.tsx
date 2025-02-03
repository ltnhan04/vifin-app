import { Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const SelectedCategories = () => {
  return (
    <ScrollView keyboardDismissMode="on-drag" contentContainerClassName="p-6">
      <TouchableOpacity
        className="flex flex-row items-center"
        activeOpacity={0.7}
      >
        <Icon name="add-circle" size={30} color={"#4CAF50"} />
        <Text className="font-rubik-bold text-xl text-secondary-green-100 ml-3">
          New Category
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SelectedCategories;
