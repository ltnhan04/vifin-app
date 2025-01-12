import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Controller } from "react-hook-form";
import { FormDataProps } from "@/types/form";
import React from "react";

const FormField: React.FC<FormDataProps> = ({
  type,
  name,
  label,
  icon,
  isSecure,
  error,
  handleShowingPassword,
  control,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <View className="gap-y-2 w-full">
          <Text className="font-rubik-medium text-lg text-secondary-gray">
            {label}
          </Text>
          <View className="relative">
            <TextInput
              secureTextEntry={isSecure}
              keyboardType={type}
              placeholder={placeholder}
              maxLength={100}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className={`font-rubik border border-secondary-gray-200 text-lg text-white px-6 py-5  rounded-xl transition-all duration-300 ease-in-out ring-secondary-gray-200 focus:ring-2 focus:border-primary-brightBlue ${error && "focus:shadow-secondary-red"} focus:border-4 shadow-md focus:shadow-primary-brightBlue text-center`}
              placeholderTextColor="#D3D3D3"
              style={{
                lineHeight: 20,
              }}
            />

            {icon && (
              <TouchableOpacity
                onPress={handleShowingPassword}
                className="absolute right-4 top-1/4"
              >
                <Icon name={icon} size={24} color="#6BBDE3" />
              </TouchableOpacity>
            )}
          </View>
          {error[name]?.message && (
            <Text className="text-secondary-red font-rubik-bold mt-1">
              {error[name]?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default FormField;
