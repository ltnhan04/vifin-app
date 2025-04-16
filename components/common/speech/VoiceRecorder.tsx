import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, AppState } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { toast } from "sonner-native";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";

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
      await audioRecordingRef.current.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await audioRecordingRef.current.startAsync();
      setIsRecording(true);
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

      const recording = audioRecordingRef.current;
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      if (!uri) throw new Error("Recording URI not found");

      const wavUri = `${FileSystem.cacheDirectory}converted.wav`;
      const command = `-y -i "${uri}" -ac 1 -ar 16000 "${wavUri}"`;
      await FFmpegKit.execute(command);
      const base64Audio = await FileSystem.readAsStringAsync(wavUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!base64Audio || base64Audio.length < 100) {
        throw new Error("Audio data is too short or invalid");
      }

      onAudioProcessed(base64Audio);
    } catch (err) {
      console.error("Failed to stop recording", err);
      toast.error("Failed to stop recording", {
        description: "Please try again.",
      });
    } finally {
      isProcessingRef.current = false;
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
    <View className="relative items-center justify-center mb-5">
      {isRecording && (
        <View className="absolute w-24 h-24 rounded-full bg-red-500 opacity-40 animate-ping z-0" />
      )}
      <TouchableOpacity
        onPress={handlePress}
        className={`w-20 h-20 rounded-full items-center justify-center shadow-md ${
          isRecording ? "bg-red-600" : "bg-primary-brighterBlue"
        }`}
        style={{ elevation: 5 }}
        disabled={isProcessing || isProcessingRef.current}
        activeOpacity={0.8}
      >
        <View className="items-center justify-center">
          <MaterialIcons
            name={isRecording ? "mic" : "mic-none"}
            size={36}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceRecorder;
