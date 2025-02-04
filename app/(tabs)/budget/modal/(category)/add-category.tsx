import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import ButtonSubmit from "@/components/ui/Button";
import Icon from "react-native-vector-icons/Ionicons";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";
import images from "@/constants/images";

const categoryTabs = [
  { id: 1, label: "Income", value: "income" },
  { id: 2, label: "Expense", value: "expense" },
];

const AddCategory = () => {
  const [categoryValue, setCategoryValue] = useState({ value: "", id: 1 });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 16,
            height: "100%",
          }}
        >
          <View className="flex flex-col justify-between" style={{ flex: 1 }}>
            <View>
              <View className="flex-row items-center gap-x-2 border-b border-gray-300 pb-3 mb-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="relative border-r border-gray-300 pr-8"
                >
                  <View className="w-12 h-12 rounded-full bg-blue-100 justify-center items-center">
                    <Image
                      source={icons.entertainment}
                      className="w-12 h-12 rounded-full"
                    />
                  </View>
                  <Icon
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    name="caret-down-outline"
                    size={16}
                  />
                </TouchableOpacity>
                <View className="flex-1">
                  <TextInput
                    keyboardType="default"
                    maxLength={50}
                    className="w-full text-xl font-semibold text-gray-800"
                    placeholder="Category Name"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View className="flex-row items-center gap-x-8 mb-4 border-b pb-3 border-gray-300">
                <Image
                  source={images.expenseIncome}
                  resizeMode="contain"
                  className="w-12 h-12"
                />
                <View className="flex-row items-center bg-blue-50 rounded-lg">
                  {categoryTabs.map((tab) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={tab.id}
                      onPress={() =>
                        setCategoryValue({ value: tab.value, id: tab.id })
                      }
                      className={`px-3 py-1 rounded-md transition-all duration-300 ease-linear ${
                        categoryValue.id === tab.id
                          ? "bg-blue-600"
                          : "bg-transparent"
                      }`}
                    >
                      <Text
                        className={`font-semibold text-base ${
                          categoryValue.id === tab.id
                            ? "text-white"
                            : "text-blue-600"
                        }`}
                      >
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-8 border-b border-gray-300 pb-3">
                <Image
                  source={images.inheritance}
                  resizeMode="contain"
                  className="w-12 h-12"
                />
                <View className="flex-row items-center justify-between flex-1">
                  <View>
                    <Text className="text-sm text-gray-600">
                      Parent category
                    </Text>
                    <Text className="text-xl font-semibold text-gray-500">
                      Select category
                    </Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={20} color="#555" />
                </View>
              </TouchableOpacity>
            </View>
            <ButtonSubmit
              title="Save"
              isDisabled={true}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={() => {}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddCategory;
