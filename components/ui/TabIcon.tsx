import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: string;
  title: string;
}) => {
  return (
    <View className="flex-1 flex flex-col items-center">
      <Icon name={icon} color={focused ? "#6BBFFF" : "#F3F4F6"} size={24} />
      <Text
        className={`${
          focused
            ? " text-primary-brighterBlue font-rubik-medium"
            : "text-secondary-gray font-rubik"
        } text-sm w-full text-center mt-2`}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;
