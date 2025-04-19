import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { formatCurrency } from "@/utils/format-currency";
import { IWallet } from "@/types/wallet";
import { ITransactionType } from "@/types/transaction";

interface ModalDropdownProps {
  showDropdown: boolean;
  handleDropdownState: () => void;
  handleSelectedOptions: (option: IWallet | ITransactionType) => void;
  dropdownFor: "transaction_type" | "wallet";
  data: (IWallet | ITransactionType)[];
  textColor?: string;
}

const ModalDropdown: React.FC<ModalDropdownProps> = ({
  showDropdown,
  handleDropdownState,
  handleSelectedOptions,
  dropdownFor,
  data,
  textColor,
}) => {
  return (
    <Modal visible={showDropdown} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleDropdownState}>
        <View
          className="bg-black/40 items-center justify-center"
          style={{ flex: 1 }}
        >
          <View
            className={`absolute top-20 bg-white rounded-lg px-4 py-2 shadow-md 
              ${dropdownFor === "transaction_type" ? "left-5" : "right-5"}`}
          >
            {data.map((item, index) => {
              const isWallet = "wallet_name" in item;
              return (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center py-2"
                  onPress={() => {
                    handleSelectedOptions(item);
                    handleDropdownState();
                  }}
                >
                  {isWallet ? (
                    <Image
                      source={{ uri: (item as IWallet).symbol }}
                      className="w-10 h-10 mr-2 rounded-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={(item as ITransactionType).icon}
                      className="w-8 h-8 mr-2"
                      resizeMode="contain"
                    />
                  )}

                  <View className="justify-center">
                    <Text className="text-base font-medium">
                      {isWallet
                        ? (item as IWallet).wallet_name
                        : (item as ITransactionType).label}
                    </Text>
                    {isWallet && (
                      <Text className={`text-base text-gray-500`}>
                        {formatCurrency(
                          Number((item as IWallet).amount),
                          "VND"
                        )}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalDropdown;
