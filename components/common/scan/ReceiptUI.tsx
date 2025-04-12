import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { toast } from "sonner-native";
import { useCreateTransactionMutation } from "@/redux/features/transaction/transactionApi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { IBillData } from "@/types/bill";
import Loading from "@/app/loading";
import { flattenCategories } from "@/utils/flatten-categories";

const ReceiptUI = ({
  resetReceipt,
  receipt,
  onUpdateReceipt,
}: {
  receipt: IBillData;
  onUpdateReceipt: (value: IBillData) => void;
  resetReceipt: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReceipt, setEditedReceipt] = useState(receipt);
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: wallets } = useGetWalletsQuery();

  const flatCategories = React.useMemo(() => {
    return flattenCategories(categories?.data || []);
  }, [categories]);

  useEffect(() => {
    if (wallets?.data?.length && !editedReceipt.wallet_id) {
      setEditedReceipt((prev) => ({
        ...prev,
        wallet_id: wallets.data[0]._id,
        wallet_name: wallets.data[0].wallet_name,
      }));
    }
  }, [wallets]);

  useEffect(() => {
    if (categories?.data?.length && editedReceipt.category) {
      const matchedCategory = flatCategories.find(
        (cat) => cat.name.replace(/--- /g, "") === editedReceipt.category
      );
      if (matchedCategory) {
        setEditedReceipt((prev) => ({
          ...prev,
          category_id: matchedCategory._id,
          category: matchedCategory.name.replace(/--- /g, ""),
        }));
      }
    }
  }, [categories, flatCategories]);

  const handleSave = () => {
    onUpdateReceipt(editedReceipt);
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    if (!editedReceipt.category_id) {
      toast.error("Please select a valid category.", {
        description: "Please try again.",
      });
      return;
    }

    const transactionData = {
      amount: editedReceipt.total,
      category_id: editedReceipt.category_id as string,
      transaction_type: editedReceipt.type,
      wallet_id: editedReceipt.wallet_id as string,
    };

    if (isLoading) {
      return <Loading />;
    }

    try {
      const response = await createTransaction(transactionData).unwrap();
      if (response.data) {
        toast.success("Transaction added", {
          description: "Keep tracking your spending!",
        });
        router.push("/(root)/(tabs)/transactions/(top-tabs)");
        resetReceipt();
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Couldn't add transaction", {
        description: "Please try again.",
      });
    }
  };

  return (
    <View className="mt-8 w-full bg-[#FFF8E7] p-5 rounded-lg shadow-lg">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">
          {editedReceipt.storeName}
        </Text>
        <Text className="text-gray-600 mt-1">Receipt</Text>
      </View>

      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <Icon name="receipt-outline" size={18} color="#316F95" />
          <Text className="ml-2 text-gray-700 text-sm">
            Invoice: {editedReceipt.invoiceNumber}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="calendar-outline" size={18} color="#316F95" />
          <Text className="ml-2 text-gray-700 text-sm">
            {formatDate(new Date(editedReceipt.date))}
          </Text>
        </View>
      </View>

      <View className="border-t border-b border-dashed border-gray-400 py-2 mb-3">
        <View className="flex-row justify-between">
          <Text className="font-bold text-gray-800">Item</Text>
          <Text className="font-bold text-gray-800">Price</Text>
        </View>
      </View>

      <View className="mb-4">
        {editedReceipt.items.map((item, index) => (
          <View key={index} className="flex-row justify-between py-1">
            <Text className="text-gray-700 font-mono">{item.name}</Text>
            <Text className="text-gray-700 font-mono">
              {formatCurrency(Number(item.price), "VND")}
            </Text>
          </View>
        ))}
      </View>

      <View className="border-t border-dashed border-gray-400 pt-3">
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold text-gray-800 text-lg">Total:</Text>
          {isEditing ? (
            <TextInput
              className="border p-1 text-gray-800"
              value={editedReceipt.total.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setEditedReceipt({ ...editedReceipt, total: Number(text) })
              }
            />
          ) : (
            <Text className="font-bold text-gray-800 text-lg">
              {formatCurrency(Number(editedReceipt.total), "VND")}
            </Text>
          )}
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-600 text-sm">Transaction Type:</Text>
          {isEditing ? (
            <Picker
              selectedValue={editedReceipt.type}
              onValueChange={(itemValue) =>
                setEditedReceipt({ ...editedReceipt, type: itemValue })
              }
              style={{ width: 150 }}
            >
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
          ) : (
            <Text className="text-gray-600 text-sm">{editedReceipt.type}</Text>
          )}
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 text-sm">Category:</Text>
          {isEditing ? (
            <Picker
              selectedValue={editedReceipt.category_id}
              onValueChange={(itemValue) => {
                const selectedCategory = flatCategories.find(
                  (category) => category._id === itemValue
                );
                setEditedReceipt({
                  ...editedReceipt,
                  category_id: itemValue,
                  category: selectedCategory
                    ? selectedCategory.name.replace(/--- /g, "")
                    : "",
                });
              }}
              style={{ width: 150 }}
            >
              <Picker.Item label="Select a category" value="" />
              {flatCategories.map((category) => (
                <Picker.Item
                  key={category._id}
                  label={category.name}
                  value={category._id}
                />
              ))}
            </Picker>
          ) : (
            <Text className="text-gray-600 text-sm">
              {editedReceipt.category || "Not selected"}
            </Text>
          )}
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 text-sm">Wallet:</Text>
          {isEditing ? (
            <Picker
              selectedValue={editedReceipt.wallet_id}
              onValueChange={(itemValue) => {
                const selectedWallet = wallets?.data?.find(
                  (wallet) => wallet._id === itemValue
                );

                setEditedReceipt({
                  ...editedReceipt,
                  wallet_id: itemValue,
                  wallet_name: selectedWallet ? selectedWallet.wallet_name : "",
                });
              }}
              style={{ width: 150 }}
            >
              {wallets?.data?.map((wallet) => (
                <Picker.Item
                  key={wallet._id}
                  label={wallet.wallet_name}
                  value={wallet._id}
                />
              ))}
            </Picker>
          ) : (
            <Text className="text-gray-600 text-sm">
              {editedReceipt.wallet_name || "Not selected"}
            </Text>
          )}
        </View>
      </View>

      <View className="mt-4 flex-row justify-between">
        {isEditing ? (
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-md"
            onPress={handleSave}
          >
            <Text className="text-white font-bold">Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-yellow-500 px-4 py-2 rounded-md"
            onPress={() => setIsEditing(true)}
          >
            <Text className="text-white font-bold">Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-green-500 px-4 py-2 rounded-md"
          onPress={handleConfirm}
        >
          <Text className="text-white font-bold">Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReceiptUI;
