import React, { useState } from "react";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FirebaseError } from "firebase/app";
import { useCreateNewCustomerMutation } from "@/redux/features/customer/customerApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

import Button from "@/components/ui/Button";
import icons from "@/constants/icons";

const GoogleLoginSection = () => {
  const dispatch = useAppDispatch();
  const [createNewCustomer] = useCreateNewCustomerMutation();
  const [isLoading, setIsLoading] = useState(false);
  const onGoogleButtonPress = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data && signInResult.data.idToken
      );
      const googleData = await auth().signInWithCredential(googleCredential);
      if (googleData.user) {
        const providerData = googleData.user.providerData.find(
          (value) => value.providerId
        );
        if (providerData) {
          const newUser = {
            full_name: providerData.displayName,
            avatar: providerData.photoURL,
            gender: "male",
            email: providerData?.email,
            provider: providerData.providerId,
          };
          const tokenResult = await googleData.user.getIdTokenResult();
          dispatch(
            setUser({
              token: tokenResult.token,
              user: { ...newUser, customerId: googleData.user.uid },
            })
          );
          const response = await createNewCustomer(newUser).unwrap();
          dispatch(
            setUser({
              token: tokenResult.token,
              user: { ...response.data, customerId: response.data._id },
            })
          );
          Toast.show({
            type: "success",
            text1: "Sign Up Successfully!",
          });
        }
      }
      return googleData;
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
