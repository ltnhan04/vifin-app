import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { categories } from "@/constants/data";
import androidSafeArea from "@/utils/android-safe-area";

const SelectedCategories = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <TouchableOpacity
          className="flex flex-row items-center mb-2"
          activeOpacity={0.7}
          onPress={() => router.push("/budget/modal/add-category")}
        >
          <Icon name="add-circle" size={30} color={"#4CAF50"} />
          <Text className="font-rubik-semibold text-xl text-secondary-green-100 ml-3">
            New Category
          </Text>
        </TouchableOpacity>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.value}
          contentContainerClassName="pb-6"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="py-1">
              <TouchableOpacity className="flex flex-row items-center py-2">
                <Image
                  className="size-9 bg-primary-lightBlue rounded-full"
                  source={item.parentIcon}
                />
                <Text className="ml-3 font-rubik-medium text-lg">
                  {item.label}
                </Text>
              </TouchableOpacity>

              {item.children && (
                <View className="border-l ml-5 border-[#ccc]">
                  <FlatList
                    data={item.children}
                    keyExtractor={(subItem) => subItem.value}
                    renderItem={({ item: subItem }) => (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: 10, alignItems: "center" }}>
                          <View
                            style={{
                              borderTopWidth: 1,
                              borderTopColor: "#ccc",
                              width: 15,
                              marginRight: 0,
                            }}
                          />
                        </View>
                        <TouchableOpacity className="flex flex-row items-center flex-1 py-3 ">
                          <Image
                            className="size-9 bg-primary-lightBlue rounded-full"
                            source={subItem.icon}
                          />
                          <Text className="ml-3 text-base text-gray-600">
                            {subItem.label}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectedCategories;
