import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";

const AddCategory = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView contentContainerClassName=" pb-4">
        <View className="flex flex-row items-center border">
          <TouchableOpacity activeOpacity={0.7} className="relative">
            <View className="size-14 rounded-full bg-primary-lightBlue">
              <Image
                source={icons.entertainment}
                className="size-14 rounded-full"
              />
            </View>
            <Icon
              className="absolute top-[40%] -right-6"
              name="caret-down-outline"
              size={18}
            />
          </TouchableOpacity>
          <View className="ml-6">
            <TextInput
              keyboardType="default"
              className="w-full"
              placeholder="Category Name"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCategory;
