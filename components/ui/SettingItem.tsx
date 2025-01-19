import { View, Text, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { languages, units } from "@/constants/data";

interface SettingItemProps {
  title: string;
  icon: string;
  showArrow?: boolean;
  showSwitch?: boolean;
  showOptions?: "currency_unit" | "languages";
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  icon,
  showArrow,
  showOptions,
  showSwitch,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-x-6 items-center justify-center">
          <Icon name={icon} color={"#fff"} size={24} />
          <Text className="text-white font-rubik-medium text-xl">{title}</Text>
        </View>
        {showArrow && (
          <View>
            <Icon name={"chevron-forward"} color={"#fff"} size={20} />
          </View>
        )}
        {showSwitch && (
          <Switch
            trackColor={{ false: "#767577", true: "#6BBFFF" }}
            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(prevState) => setIsEnabled(!!prevState)}
            value={isEnabled}
          />
        )}
        {showOptions && (
          <View>
            <Text>Hello</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SettingItem;
