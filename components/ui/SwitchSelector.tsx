import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ItemTabType } from "@/types/switch";

const SwitchTab = ({ itemTab }: { itemTab: ItemTabType[] }) => {
  const [switchSelector, setSwitchSelector] = useState<{
    tabId: number;
    value: string;
  }>({ tabId: 1, value: "week" });
  return (
    <View className=" p-1 bg-white rounded-lg w-full">
      <View className={`flex flex-row justify-between items-center`}>
        {itemTab.map((value) => (
          <TouchableOpacity
            className={`w-1/2 py-2 rounded-xl transition-colors duration-300 ease-in-out ${switchSelector.tabId === value.id ? "bg-[#E3F2FD]" : "bg-white"} `}
            key={value.id}
            onPress={() =>
              setSwitchSelector((prev) => ({
                ...prev,
                tabId: value.id,
                value: value.value,
              }))
            }
          >
            <Text
              className={`font-rubik-medium transition-colors duration-300 ease-in-out text-center text-sm ${switchSelector.tabId === value.id ? "text-primary-brighterBlue" : "text-black "}`}
            >
              {value.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SwitchTab;
