import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { formatCurrency } from "@/utils/format-currency";

const TotalBalancesSection = () => {
  const [isHide, setIsHide] = useState(false);

  return (
    <View className="px-6 py-4 mt-6 border border-primary-brightBlue rounded-xl">
      <View className="flex flex-row items-center">
        <Image source={icons.dollar} resizeMode="contain" className="size-8" />
        <Text className="font-rubik-medium text-lg text-secondary-yellow ml-2">
          Total Balances
        </Text>
      </View>
      <View className="mt-3 font-rubik-light text-xl relative">
        <MaskedView
          maskElement={
            <Text className=" text-xl font-rubik-medium text-left">
              {isHide ? "***********" : formatCurrency(300000, "VND")}
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
  );
};

export default TotalBalancesSection;
