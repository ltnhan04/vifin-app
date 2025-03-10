import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
} from "react-native";
import { Controller, FieldErrors, Control } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import icons from "@/constants/icons";
import Icon from "react-native-vector-icons/Ionicons";
import type { WalletType } from "@/schema/wallet.schema";

const InputWalletName = ({
  control,
  errors,
  disabled,
}: {
  control: Control<WalletType>;
  errors: FieldErrors<WalletType>;
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
    <View className="flex-row items-center gap-x-4 border-b border-gray-300 pb-4 mb-4">
      <Controller
        name="symbol"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            className="relative border-r border-gray-300 pr-8"
            onPress={() => pickImage(onChange)}
          >
            <View
              className={`w-14 h-14 rounded-full ${errors.symbol ? "border-4 border-secondary-red" : ""} bg-blue-100 justify-center items-center overflow-hidden`}
            >
              {value ? (
                <Image
                  source={{ uri: value }}
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <Image
                  source={icons.wallet}
                  className="w-14 h-14 rounded-full"
                />
              )}
            </View>
            <Icon
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              name="caret-down-outline"
              color={"#fff"}
              size={16}
            />
          </TouchableOpacity>
        )}
      />
      <Controller
        name="wallet_name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-1">
            <TextInput
              keyboardType="default"
              maxLength={50}
              editable={!disabled}
              className="w-full text-xl font-semibold text-white"
              placeholder="Enter wallet name"
              placeholderTextColor="#fff"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.wallet_name && (
              <View className="flex-row items-center gap-x-1">
                <Text className="text-red-500 text-sm">
                  {errors.wallet_name.message}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default InputWalletName;
