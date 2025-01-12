import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";

import { ButtonProps } from "@/types/button";

const ButtonSubmit: React.FC<ButtonProps> = ({
  title,
  isLoading,
  background,
  icon,
  textColor,
  handleOnPress,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={() => {
        handleOnPress();
      }}
      activeOpacity={0.7}
      className={`py-5 px-6 mt-4 rounded-xl transition-opacity duration-300 ease-in-out ${isLoading ? "opacity-40" : ""}`}
      style={{ backgroundColor: background }}
    >
      <View className="flex flex-row items-center justify-center gap-x-4">
        {icon ? (
          <Image source={icon} className="w-6 h-6" resizeMode="contain" />
        ) : (
          ""
        )}
        <Text
          className={`text-center font-rubik-bold `}
          style={{ color: textColor }}
        >
          {isLoading ? (
            <View className="flex flex-row items-center gap-x-2">
              <Text
                className={`text-center font-rubik-bold`}
                style={{ color: textColor }}
              >
                {title}
              </Text>
              <ActivityIndicator size="small" color={textColor} />
            </View>
          ) : (
            title
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSubmit;
