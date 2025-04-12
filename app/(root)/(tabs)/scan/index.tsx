import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { useExpenseClassificationMutation } from "@/redux/features/bill/billApi";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import androidSafeArea from "@/utils/android-safe-area";
import ReceiptUI from "@/components/common/scan/ReceiptUI";
import { IBillData } from "@/types/bill";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import VoiceButton from "@/components/common/speech/VoiceButton";

const ScanScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [receipt, setReceipt] = useState<IBillData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expenseClassification] = useExpenseClassificationMutation();

  const recognizeTextFromImage = async (imagePath: string) => {
    try {
      setLoading(true);
      const processedImage = await TextRecognition.recognize(imagePath);
      const clearSpace = processedImage.text.replace(/\s+/g, " ").trim();
      setRecognizedText(clearSpace);
      const response = await expenseClassification({ text: clearSpace });
      if (response.data) {
        setReceipt(response.data.data);
      }
    } catch (error) {
      console.error("Error recognizing text from image: ", error);
      Alert.alert(
        "Oops!",
        "We had trouble recognizing the text. Mind giving it another go?"
      );
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      resetState();
      setImage(result.assets[0].uri);
      recognizeTextFromImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "The app needs access to the camera to take photos. Please allow access in your settings."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      resetState();
      setImage(result.assets[0].uri);
      recognizeTextFromImage(result.assets[0].uri);
    }
  };

  const resetState = () => {
    setImage(null);
    setRecognizedText("");
    setReceipt(null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <View style={{ flex: 1 }}>
          <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerClassName="flex-grow items-center justify-center px-5 pb-[80px]"
              keyboardShouldPersistTaps="handled"
            >
              {!image && !loading && !receipt && (
                <View className="items-center">
                  <Icon name="camera-outline" size={80} color="white" />
                  <Text className="text-white text-lg text-center mt-5">
                    Capture or select an image to start scanning.
                  </Text>
                </View>
              )}

              {loading && (
                <View className="mt-4 items-center">
                  <ActivityIndicator size="large" color="#fff" />
                  <Text className="text-white text-lg mt-2">Processing...</Text>
                </View>
              )}

              {receipt && (
                <ReceiptUI
                  resetReceipt={resetState}
                  receipt={receipt}
                  onUpdateReceipt={(updatedData) => setReceipt(updatedData)}
                />
              )}

              {!loading && image && !receipt && (
                <View className="mt-5">
                  <Image
                    source={{ uri: image }}
                    className="w-60 h-60 rounded-lg border-2 border-white"
                  />
                  {recognizedText ? (
                    <View className="flex flex-col items-center justify-center mt-5 bg-white bg-opacity-80 p-4 rounded-md w-full">
                      <Text className="font-bold text-base mb-2">
                        Recognized Text:
                      </Text>
                      <Text className="text-sm text-gray-800">
                        {recognizedText}
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 h-20 flex-row bg-[#316F95] items-center justify-around">
              <TouchableOpacity onPress={pickImage} className="items-center">
                <Icon name="images-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1 font-medium">
                  Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} className="items-center">
                <Icon name="camera-outline" size={30} color="white" />
                <Text className="text-white text-xs mt-1 font-medium">
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetState} className="items-center">
                <Icon name="refresh-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1 font-medium">
                  Retake
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <VoiceButton />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ScanScreen;
