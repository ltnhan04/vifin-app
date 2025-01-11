import { View, Text, TextInput, Image } from "react-native";
import { Controller } from "react-hook-form";
import { FormDataProps } from "@/types/form";
import React from "react";

const FormField: React.FC<FormDataProps> = ({
  type,
  name,
  label,
  icon,
  isSecure,
  control,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="gap-y-2 w-full">
          <Text className="font-rubik-medium text-lg text-secondary-gray">
            {label}
          </Text>
          <View>
            <TextInput
              secureTextEntry={isSecure}
              keyboardType={type}
              placeholder={placeholder}
              className="border border-secondary-gray-200 text-base text-white px-5 py-4 rounded-lg transition-all duration-300 ease-in-out ring-secondary-gray-200 focus:ring-2 focus:border-primary-brightBlue focus:border-opacity-50 focus:border-4 shadow-md focus:shadow-primary-brightBlue text-center"
              placeholderTextColor="#D3D3D3"
              style={{
                textAlignVertical: "center",
              }}
            />

            {icon && (
              <Image
                style={{ backgroundColor: "#fff" }}
                className="size-6"
                source={icon}
              ></Image>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default FormField;
