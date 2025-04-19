import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Control, Controller, FieldErrors } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import icons from "@/constants/icons";
import { CategoryType } from "@/schema/category.schema";

const InputCategoryName = ({
  control,
  errors,
  disabled,
}: {
  control: Control<CategoryType>;
  errors: FieldErrors<CategoryType>;
  disabled: boolean;
}) => {
  const pickImage = async (onChange: (value: string) => void) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photo library to select an image."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onChange(uri);
    }
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-x-6 border-b border-white/10 pb-4">
        <Controller
          name="symbol"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="flex flex-col items-left">
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={disabled}
                className="relative border-r border-white/10 pr-8"
                onPress={() => pickImage(onChange)}
              >
                <View
                  className={`w-14 h-14 rounded-full ${
                    errors.symbol ? "border-2 border-secondary-red shadow-sm shadow-secondary-red/50" : "border border-white/20"
                  } bg-secondary-gray-100/90 justify-center items-center overflow-hidden shadow-lg shadow-black/25`}
                >
                  {value ? (
                    <Image
                      source={{ uri: value }}
                      className="w-14 h-14 rounded-full opacity-90"
                    />
                  ) : (
                    <Image
                      source={icons.uncategorizedExpense}
                      className="w-12 h-12 rounded-full opacity-90"
                    />
                  )}
                </View>
                <View className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/10 rounded-full p-0.5">
                  <Icon
                    name="caret-down-outline"
                    color={errors.symbol ? "#ef4444" : "rgba(255,255,255,0.8)"}
                    size={14}
                  />
                </View>
              </TouchableOpacity>
              {errors.symbol && (
                <Text className="text-secondary-red text-xs font-rubik-medium mt-2 ml-1">
                  {errors.symbol.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-1">
              <TextInput
                keyboardType="default"
                maxLength={50}
                editable={!disabled}
                className="w-full text-xl font-rubik-semibold text-white/90"
                placeholder="Category name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <View className="flex-row items-center gap-x-2 mt-1">
                  <Icon name="alert-circle-outline" size={14} color="#ef4444" />
                  <Text className="text-secondary-red text-sm font-rubik-medium">
                    {errors.name.message}
                  </Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default InputCategoryName;
