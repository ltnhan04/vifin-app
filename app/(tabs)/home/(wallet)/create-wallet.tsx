import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";
import { units } from "@/constants/data";
import Dropdown from "@/components/ui/Dropdown";

const CreateWallet = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
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
                placeholder="Wallet Name"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View className="flex-row items-center gap-x-2 border-b border-gray-300 pb-3 mb-4">
            <Icon
              name="cash"
              size={40}
              className="pr-8 border-gray-300 border-r"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateWallet;
