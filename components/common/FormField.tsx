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
  handleChangeText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="space-y-2 w-full">
          <Text className="font-rubik-medium text-sm text-secondary-gray">
            {label}
          </Text>
          <View>
            <TextInput
              onChangeText={handleChangeText}
              secureTextEntry={isSecure}
              keyboardType={type}
              placeholder={placeholder}
            />
            {icon && <Image source={icon}></Image>}
          </View>
        </View>
      )}
    />
  );
};

export default FormField;
