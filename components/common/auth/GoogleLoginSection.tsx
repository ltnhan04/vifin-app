import React, { useState } from "react";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FirebaseError } from "firebase/app";

import Button from "@/components/ui/Button";
import icons from "@/constants/icons";

const GoogleLoginSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  });
  const onGoogleButtonPress = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data && signInResult.data.idToken,
      );
      return await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      const err = error as FirebaseError;
      Toast.show({
        type: "error",
        text1: "Sign in with Google failed: " + err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      icon={icons.google}
      handleOnPress={() => {
        onGoogleButtonPress();
      }}
      isLoading={isLoading}
      textColor="black"
      background="#F3F4F6"
      title="Continue with Google"
    />
  );
};

export default GoogleLoginSection;
