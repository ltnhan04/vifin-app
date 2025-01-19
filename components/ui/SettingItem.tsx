import { View, Text, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { languages, units } from "@/constants/data";

interface SettingItemProps {
  title: string;
  icon: string;
  isLogout?: boolean;
  showArrow?: boolean;
  showSwitch?: boolean;
  showOptions?: "currency_unit" | "languages";
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  icon,
  showArrow,
  isLogout,
  showOptions,
  showSwitch,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-x-6 items-center justify-center">
          <Icon name={icon} color={isLogout ? "#D15757" : "#fff"} size={24} />
          <Text
            className={` ${isLogout ? "text-secondary-red" : "text-white"}  font-rubik-medium text-xl`}
          >
            {title}
          </Text>
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
          <Dropdown
            data={showOptions === "currency_unit" ? units : languages}
            onChange={() => {}}
            placeholder={showOptions === "currency_unit" ? "USD" : "English"}
          />
        )}
      </View>
    </View>
  );
};

export default SettingItem;
