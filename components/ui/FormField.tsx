import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Controller } from "react-hook-form";
import { FormDataProps } from "@/types/form";

const FormField: React.FC<FormDataProps> = ({
  type,
  name,
  label,
  icon,
  isSecure,
  isDisabled,
  error,
  handleShowingPassword,
  control,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
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
              disableFullscreenUI={isDisabled}
              secureTextEntry={isSecure}
              keyboardType={type}
              placeholder={placeholder}
              maxLength={100}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onChangeText={onChange}
              style={[
                styles.textInput,
                isFocused && styles.textInputFocused,
                error[name]?.message && styles.textInputError,
              ]}
              placeholderTextColor="#D3D3D3"
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

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "Rubik",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    fontSize: 16,
    color: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    textAlign: "left",
  },
  textInputFocused: {
    borderColor: "#38BDF8",
    borderWidth: 2,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  textInputError: {
    borderColor: "#EF4444",
  },
});
