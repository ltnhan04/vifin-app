import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const AddTransactionButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(root)/(tabs)/transactions/modal")}
      className="bg-primary-blue rounded-full p-2"
      activeOpacity={0.8}
    >
      <Icon name="add" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddTransactionButton;
