import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "@/redux/hooks";
import { setLogout } from "@/redux/features/auth/authSlice";
import SettingItem from "@/components/ui/SettingItem";

const LogoutSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const showConfirmLogout = () => {
    Alert.alert(
      "Confirm Logout!",
      "Are you sure to continue logout?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => handleLogout(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(setLogout());
      Toast.show({
        type: "success",
        text1: "Logout Successfully!",
      });
      router.replace("/(auth)/sign-in");
    } catch (error: any) {
      const err = error as FirebaseError;
      Toast.show({
        type: "error",
        text1: "Logout Failed" + err.message,
      });
    }
  };
  return (
    <TouchableOpacity onPress={() => showConfirmLogout()}>
      <SettingItem icon="log-out" title="Logout" isLogout={true} />
    </TouchableOpacity>
  );
};

export default LogoutSection;
