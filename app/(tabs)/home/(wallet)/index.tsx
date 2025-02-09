import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";
import { formatCurrency } from "@/utils/format-currency";

const WalletScreen = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row items-center mt-4">
          <View className="w-[80%]">
            <View className="flex flex-row items-center justify-between pr-4">
              <View className="flex flex-row items-center gap-x-3">
                <Image
                  source={icons.walletIcon}
                  className="size-9 bg-primary-dark rounded-full"
                />
                <View>
                  <Text className="text-black font-rubik-medium text-xl">
                    Momo Wallet
                  </Text>
                  <Text className="text-black font-rubik-medium text-lg">
                    {formatCurrency(50000, "VND")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-[20%]">
            <View className="px-3 py-1 bg-primary-blue rounded-lg">
              <TouchableOpacity
                className="flex flex-row items-center gap-x-2"
                activeOpacity={0.8}
              >
                <Text className="text-lg text-white font-bold">Edit</Text>
                <Icon name="create-outline" color={"#fff"} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center mt-4">
          <View className="w-[80%]">
            <View className="flex flex-row items-center justify-between pr-4">
              <View className="flex flex-row items-center gap-x-3">
                <Image
                  source={icons.walletIcon}
                  className="size-9 bg-primary-dark rounded-full"
                />
                <View>
                  <Text className="text-black font-rubik-medium text-xl">
                    Momo Wallet
                  </Text>
                  <Text className="text-black font-rubik-medium text-lg">
                    {formatCurrency(50000, "VND")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-[20%]">
            <View className="px-3 py-1 bg-primary-blue rounded-lg">
              <TouchableOpacity
                className="flex flex-row items-center gap-x-2"
                activeOpacity={0.8}
              >
                <Text className="text-lg text-white font-bold">Edit</Text>
                <Icon name="create-outline" color={"#fff"} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
