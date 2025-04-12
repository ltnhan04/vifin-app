import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, AppState } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { toast } from "sonner-native";
import { recordSpeech } from "@/utils/recordSpeech";

interface VoiceRecorderProps {
  onAudioProcessed: (base64Audio: string) => void;
  isProcessing: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onAudioProcessed,
  isProcessing,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioRecordingRef = useRef<Audio.Recording>(new Audio.Recording());
  const isProcessingRef = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        isRecording
      ) {
        stopRecording();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      await recordSpeech(audioRecordingRef, setIsRecording, false);
    } catch (error) {
      console.error("Failed to start recording:", error);
      toast.error("Failed to start recording", {
        description: "Please try again.",
      });
    }
  };

  const stopRecording = async () => {
    try {
      isProcessingRef.current = true;
      setIsRecording(false);

      if (audioRecordingRef.current) {
        await audioRecordingRef.current.stopAndUnloadAsync();
        const status = await audioRecordingRef.current.getStatusAsync();
        console.log("Recording status:", status);

        if (status.durationMillis === 0) {
          throw new Error("No audio was recorded");
        }

        const uri = audioRecordingRef.current.getURI();
        if (!uri) throw new Error("Recording URI not found");

        const response = await fetch(uri);
        const blob = await response.blob();

        if (blob.size === 0) {
          throw new Error("Recorded audio is empty");
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result?.toString().split(",")[1];
          if (!base64Audio || base64Audio.length < 100) {
            throw new Error("Audio data is too short or invalid");
          }
          onAudioProcessed(base64Audio);
          isProcessingRef.current = false;
        };
        reader.readAsDataURL(blob);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
      toast.error("Failed to stop recording", {
        description: "Please try again.",
      });
      isProcessingRef.current = false;
    } finally {
      audioRecordingRef.current = new Audio.Recording();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
  };

  const handlePress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <View
      className="w-20 h-20 rounded-full justify-center items-center mb-5"
      style={{ backgroundColor: isRecording ? "#EF4444" : "#3B82F6" }}
    >
      <TouchableOpacity
        onPress={handlePress}
        className="w-full h-full justify-center items-center"
        disabled={isProcessing || isProcessingRef.current}
      >
        <MaterialIcons
          name={isRecording ? "mic" : "mic-none"}
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceRecorder;
