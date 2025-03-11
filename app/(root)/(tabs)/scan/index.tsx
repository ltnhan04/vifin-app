import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { LinearGradient } from "expo-linear-gradient";
import androidSafeArea from "@/utils/android-safe-area";

const ScanScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const recognizeTextFromImage = async (imagePath: string) => {
    try {
      setLoading(true);
      const processedImage = await TextRecognition.recognize(imagePath);
      const clearSpace = processedImage.text.replace(/\s+/g, " ").trim();
      console.log("Recognized Text: ", clearSpace);
      const response = await fetch(
        "https://app-sc2kyqxjlq-uc.a.run.app/api/make-bill",
        {
          method: "POST",
          body: JSON.stringify({ text: clearSpace }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const jsonResponse = await response.json();
      setResult(jsonResponse);
    } catch (error) {
      console.error("Error recognizing text from image: ", error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      recognizeTextFromImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View className="w-full flex items-center">
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.7}
              className="bg-primary-brighterBlue px-6 py-3 rounded-lg shadow-lg"
            >
              <Text className="text-white text-lg font-bold">
                📸 Pick an image from camera roll
              </Text>
            </TouchableOpacity>

            {image && (
              <Image
                source={{ uri: image }}
                className="w-60 h-60 mt-5 rounded-lg border-2 border-white"
              />
            )}

            {loading && (
              <ActivityIndicator size="large" color="#fff" className="mt-4" />
            )}

            {result && !loading && (
              <View className="mt-5 bg-black/60 p-4 rounded-md w-11/12">
                <Text className="text-white text-lg font-bold text-center">
                  🔍 Detected Text:
                </Text>
                <Text className="text-yellow-400 text-base mt-2">
                  {JSON.stringify(result, null, 2)}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ScanScreen;
