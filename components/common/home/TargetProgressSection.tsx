import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import TargetItem from "@/components/ui/TargetItem";

const TargetProgressSection = () => {
  return (
    <View className="px-6 py-4 mt-6 border border-primary-brightBlue rounded-xl">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={icons.target}
            resizeMode="contain"
            className="size-8"
          />
          <Text className="font-rubik-medium text-lg text-secondary-yellow ml-2">
            Target Progress
          </Text>
        </View>
        <Text className="font-rubik-light text-primary-brighterBlue text-sm">
          See All
        </Text>
      </View>
      <TargetItem percentage={76.8} />
      <TargetItem percentage={48} />
      <TargetItem percentage={60} />
    </View>
  );
};

export default TargetProgressSection;
