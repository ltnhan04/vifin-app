import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { formatCurrency } from "@/utils/format-currency";

interface VoiceResultProps {
  text: string;
  categorizedData: any;
  onConfirm: () => void;
}

const VoiceResult: React.FC<VoiceResultProps> = ({
  text,
  categorizedData,
  onConfirm,
}) => {
  return (
    <View className="w-full">
      <View className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Your Voice
        </Text>
        <Text className="text-base text-gray-900 dark:text-white">
          {text || "Press the mic button to start recording..."}
        </Text>
      </View>

      {categorizedData && (
        <>
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Amount
            </Text>
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {formatCurrency(categorizedData.total, "VND")}
            </Text>

            <View className="flex-row justify-between">
              <View>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Type
                </Text>
                <Text className="text-base text-gray-900 dark:text-white">
                  {categorizedData.type === "expense" ? "Expense" : "Income"}
                </Text>
              </View>
              <View>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Category
                </Text>
                <Text className="text-base text-gray-900 dark:text-white">
                  {categorizedData.category}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="py-3 px-8 rounded-full bg-primary-brighterBlue"
            onPress={onConfirm}
            activeOpacity={0.7}
          >
            <Text className="text-white text-base font-bold text-center">
              Confirm
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default VoiceResult;
