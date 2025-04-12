import React, { useState } from "react";
import { View, Modal, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { toast } from "sonner-native";
import { router } from "expo-router";
import {
  useExpenseClassificationByVoiceMutation,
  useTranscribeAudioMutation,
} from "@/redux/features/speech/speechApi";
import { useCreateTransactionMutation } from "@/redux/features/transaction/transactionApi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import { flattenCategories } from "@/utils/flatten-categories";
import VoiceRecorder from "./VoiceRecorder";
import VoiceResult from "./VoiceResult";

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({ visible, onClose }) => {
  const [text, setText] = useState("");
  const [categorizedData, setCategorizedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expenseClassification] = useExpenseClassificationByVoiceMutation();
  const [transcribeAudio] = useTranscribeAudioMutation();
  const [createTransaction] = useCreateTransactionMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: wallets } = useGetWalletsQuery();

  const flatCategories = React.useMemo(() => {
    return flattenCategories(categories?.data || []);
  }, [categories]);

  const handleAudioProcessed = async (base64Audio: string) => {
    try {
      setIsProcessing(true);
      setText("");
      setCategorizedData(null);

      const transcribeResult = await transcribeAudio({
        audioUrl: base64Audio,
        audioConfig: {
          encoding: "LINEAR16",
          sampleRateHertz: 16000,
          languageCode: "en-US",
        },
      }).unwrap();

      if (transcribeResult.transcript) {
        setText(transcribeResult.transcript);
        const classificationResult = await expenseClassification({
          text: transcribeResult.transcript,
        }).unwrap();
        setCategorizedData(classificationResult.data);
      } else {
        toast.error("Voice recognition failed", {
          description: "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error("Voice recognition failed", {
        description: "Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = async () => {
    if (!categorizedData) return;

    const matchedCategory = flatCategories.find(
      (cat) => cat.name.replace(/--- /g, "") === categorizedData.category
    );

    if (!matchedCategory) {
      toast.error("Category not found", {
        description: "Please try again.",
      });
      return;
    }

    if (!wallets?.data?.length) {
      toast.error("No wallet found", {
        description: "Please create a wallet first.",
      });
      return;
    }

    const transactionData = {
      amount: categorizedData.total,
      transaction_type: categorizedData.type,
      category_id: matchedCategory._id,
      wallet_id: wallets.data[0]._id,
      note: text,
    };

    try {
      const response = await createTransaction(transactionData).unwrap();
      if (response.data) {
        toast.success("Transaction added successfully", {
          description: "Keep tracking your expenses!",
        });
        router.push("/(root)/(tabs)/transactions/(top-tabs)");
        onClose();
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction", {
        description: "Please try again.",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="absolute inset-0 bg-black/50 justify-center items-center">
        <View className="w-[90%] max-w-md rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-lg">
          <View className="flex-row justify-end mb-4">
            <TouchableOpacity 
              className="p-1" 
              onPress={onClose}
              disabled={isProcessing}
            >
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="items-center py-5">
            <VoiceRecorder 
              onAudioProcessed={handleAudioProcessed} 
              isProcessing={isProcessing}
            />
            
            {isProcessing ? (
              <View className="items-center mt-5">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-base text-center mt-3 text-gray-600 dark:text-gray-300">
                  Processing voice...
                </Text>
              </View>
            ) : (
              <VoiceResult
                text={text}
                categorizedData={categorizedData}
                onConfirm={handleConfirm}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VoiceModal;
