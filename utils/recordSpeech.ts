import { Audio } from "expo-av";
import { Platform } from "react-native";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export const recordSpeech = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
  setIsRecording: Dispatch<SetStateAction<boolean>>,
  alreadyReceivedPermission: boolean
) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const doneRecording = audioRecordingRef?.current?._isDoneRecording;
    if (doneRecording) {
      audioRecordingRef.current = new Audio.Recording();
    }

    let permissionResponse: Audio.PermissionResponse | null = null;
    if (Platform.OS !== "web") {
      permissionResponse = await Audio.requestPermissionsAsync();
    }

    if (alreadyReceivedPermission || permissionResponse?.status === "granted") {
      const recordingStatus =
        await audioRecordingRef?.current?.getStatusAsync();
      setIsRecording(true);

      if (!recordingStatus?.canRecord) {
        audioRecordingRef.current = new Audio.Recording();

        const recordingOptions = {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          android: {
            extension: ".m4a",
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 64000,
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };

        await audioRecordingRef.current.prepareToRecordAsync(recordingOptions);
      }

      await audioRecordingRef.current.startAsync();
    } else {
      console.error("Permission to record audio is required!");
    }
  } catch (err) {
    console.error("Failed to start recording", err);
  }
};
