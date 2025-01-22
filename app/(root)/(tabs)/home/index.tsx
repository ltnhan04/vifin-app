import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import androidSafeArea from "@/utils/android-safe-area";

const HomeScreen = () => {
  const [isHide, setIsHide] = useState(false);
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerClassName="px-6 py-10">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center">
              <Image
                source={icons.hello}
                className="size-8"
                resizeMode="contain"
              />
              <Text className="text-white font-rubik-medium text-xl ml-2">
                Welcome to{" "}
                <Text className="text-primary-brightBlue">ViFin</Text>
                <Text className="font-rubik-bold">, Nhan Luong</Text>
              </Text>
            </View>
            <Image
              source={icons.bell}
              resizeMode="contain"
              className="size-7"
            />
          </View>
          <View className="px-6 py-4 mt-6 border border-primary-deepBlue rounded-xl">
            <View className="flex flex-row items-center">
              <Image
                source={icons.dollar}
                resizeMode="contain"
                className="size-7"
              />
              <Text className="font-rubik-medium text-lg text-secondary-yellow ml-2">
                Total Balances
              </Text>
            </View>
            <View className="mt-3 font-rubik-light text-xl relative">
              <MaskedView
                maskElement={
                  <Text className=" text-xl font-rubik-medium text-left">
                    {isHide ? "***********" : "300.000"} VND
                  </Text>
                }
              >
                <LinearGradient colors={["#1A73E8", "#00C9A7"]}>
                  <Text></Text>
                </LinearGradient>
              </MaskedView>
              <TouchableOpacity
                className="absolute right-0"
                onPress={() => setIsHide(!isHide)}
              >
                {!isHide ? (
                  <Icon name="eye-off-outline" size={24} color={"#fff"} />
                ) : (
                  <Icon name="eye-outline" size={24} color={"#fff"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
