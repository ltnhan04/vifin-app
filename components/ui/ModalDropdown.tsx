import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { formatCurrency } from "@/utils/format-currency";

export interface OptionItem {
  icon?: HTMLImageElement;
  label: string;
  value: string | number;
}

interface ModalDropdownProps {
  showDropdown: boolean;
  handleDropdownState: () => void;
  handleSelectedOptions: (optionValue: OptionItem) => void;
  dropdownFor: "category" | "wallet";
  data: OptionItem[];
}

const ModalDropdown: React.FC<ModalDropdownProps> = ({
  showDropdown,
  handleDropdownState,
  handleSelectedOptions,
  dropdownFor,
  data,
}) => {
  return dropdownFor === "wallet" ? (
    <Modal visible={showDropdown} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleDropdownState}>
        <View
          className="bg-black/40 items-center justify-center"
          style={{ flex: 1 }}
        >
          <View className="absolute top-20 right-4 bg-white rounded-lg px-4 py-2 shadow-md">
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-2"
                onPress={() => {
                  handleSelectedOptions(item);
                  handleDropdownState();
                }}
              >
                <Image
                  source={item.icon}
                  className="w-8 h-8 mr-2"
                  resizeMode="contain"
                />
                <View className="justify-center">
                  <Text className="text-base font-medium">{item.label}</Text>
                  <Text className="text-sm text-gray-500">
                    {formatCurrency(item.value as number, "VND")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  ) : (
    <Modal visible={showDropdown} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleDropdownState}>
        <View
          className="bg-black/40 items-center justify-center"
          style={{ flex: 1 }}
        >
          <View className="absolute top-20 left-6 bg-white rounded-lg px-4 py-2 shadow-md">
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-2"
                onPress={() => {
                  handleSelectedOptions(item);
                  handleDropdownState();
                }}
              >
                <Image
                  source={item.icon}
                  className="w-8 h-8 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-base font-medium">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalDropdown;
