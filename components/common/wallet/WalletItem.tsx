import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useDeleteWalletMutation } from "@/redux/features/wallet/walletApi";
import Toast from "react-native-toast-message";
import { formatCurrency } from "@/utils/format-currency";
import Loading from "@/app/loading";

interface WalletItemProps {
  _id: string;
  walletIcon: any;
  walletName: string;
  amount: number;
}

const WalletItem: React.FC<WalletItemProps> = ({
  _id,
  walletIcon,
  walletName,
  amount,
}) => {
  const [deleteWallet, { isSuccess }] = useDeleteWalletMutation();
  const router = useRouter();
  if (isSuccess) {
    return <Loading />;
  }

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the wallet "${walletName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteWallet({ id: _id }).unwrap();
              Toast.show({
                type: "success",
                text1: "Wallet has been deleted successfully!",
              });
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete wallet. Please try again."
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex flex-row justify-between items-center mt-4">
      <View className="flex flex-row items-center gap-x-3">
        <Image
          source={{ uri: walletIcon }}
          resizeMode="cover"
          className="size-14 bg-primary-dark rounded-full"
        />
        <View>
          <Text
            className="text-white font-rubik-medium text-xl"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: 150 }}
          >
            {walletName}
          </Text>

          <Text className="text-white font-rubik-medium text-lg">
            {formatCurrency(amount, "VND")}
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-x-2">
        <TouchableOpacity
          onPress={() =>
            router.push(`/(root)/(tabs)/home/(wallet)/edit-wallet/${_id}`)
          }
          className="flex flex-row items-center gap-x-2 px-3 py-2 bg-primary-blue rounded-lg"
          activeOpacity={0.8}
        >
          <Icon name="create-outline" color={"#fff"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmDelete}
          className="flex flex-row items-center gap-x-2 px-3 py-2 bg-secondary-red rounded-lg"
          activeOpacity={0.8}
          disabled={isSuccess}
        >
          <Icon name="trash-outline" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletItem;
