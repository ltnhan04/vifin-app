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
  isDisabled,
  background,
  icon,
  textColor,
  handleOnPress,
}) => {
  return (
    <TouchableOpacity
      testID="button-submit"
      disabled={isLoading || isDisabled}
      onPress={() => {
        handleOnPress();
      }}
      activeOpacity={0.7}
      className={`py-4 px-5 mt-4 w-full rounded-xl transition-opacity duration-300 ease-in-out ${isLoading || isDisabled ? "opacity-40" : ""}`}
      style={{ backgroundColor: background }}
    >
      <View className="flex flex-row items-center justify-center gap-x-4">
        {icon ? (
          <Image testID="button-icon" source={icon} className="w-6 h-6" resizeMode="contain" />
        ) : (
          ""
        )}
        <Text
          className={`text-center font-rubik-medium text-lg`}
          style={{ color: textColor }}
        >
          {isLoading || isDisabled ? (
            <View className="flex flex-row items-center gap-x-2">
              <Text
                className={`text-center font-rubik-medium text-lg`}
                style={{ color: textColor }}
              >
                {title}
              </Text>
              {isLoading && (
                <ActivityIndicator testID="activity-indicator" size="small" color={textColor} />
              )}
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
