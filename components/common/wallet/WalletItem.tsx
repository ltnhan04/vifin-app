import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/redux/hooks";
import { useDeleteWalletMutation } from "@/redux/features/wallet/walletApi";
import { clearSelectedWallet } from "@/redux/features/wallet/walletSlice";
import { toast } from "sonner-native";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteWallet, { isLoading }] = useDeleteWalletMutation();
  if (isLoading) {
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
              dispatch(clearSelectedWallet());
              toast.success("Wallet deleted", {
                description: "That wallet is no longer available.",
              });
            } catch (error) {
              console.error("Delete Wallet Error:", error);
              toast.error("Failed to delete wallet", {
                description: "Please check and try again.",
              });
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex flex-row justify-between items-center mt-6">
      <View className="flex flex-row items-center gap-x-3">
        <Image
          source={{ uri: walletIcon }}
          resizeMode="cover"
          className="size-16 bg-primary-dark rounded-full"
        />
        <View>
          <Text
            className="text-white font-rubik-medium text-2xl"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: 150 }}
          >
            {walletName}
          </Text>

          <Text className="text-white font-rubik-medium text-xl">
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
          disabled={isLoading}
        >
          <Icon name="trash-outline" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletItem;
