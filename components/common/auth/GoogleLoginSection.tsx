import React, { useState } from "react";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FirebaseError } from "firebase/app";
import {
  useCreateNewCustomerMutation,
  useLazyGetCustomerQuery,
} from "@/redux/features/customer/customerApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import Button from "@/components/ui/Button";
import icons from "@/constants/icons";

const GoogleLoginSection = () => {
  const dispatch = useAppDispatch();
  const [createNewCustomer] = useCreateNewCustomerMutation();
  const [getCustomer] = useLazyGetCustomerQuery();
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
        const tokenResult = await googleData.user.getIdTokenResult();

        if (providerData) {
          const { data: existingUser } = await getCustomer({
            customerId: providerData.uid,
          });

          if (existingUser) {
            dispatch(
              setUser({
                token: tokenResult.token,
                user: {
                  ...existingUser.data,
                  customerId: existingUser.data._id,
                },
              })
            );
          } else {
            const newUser = {
              full_name: providerData.displayName,
              avatar: providerData.photoURL,
              gender: "male",
              email: providerData?.email,
              provider: providerData.providerId,
            };
            const response = await createNewCustomer(newUser).unwrap();
            dispatch(
              setUser({
                token: tokenResult.token,
                user: { ...response.data, customerId: response.data._id },
              })
            );
          }

          Toast.show({
            type: "success",
            text1: "Welcome back 👋",
            text2: "You’re all set to manage your finances.",
          });
        }
      }
      return googleData;
    } catch (error: any) {
      const err = error as FirebaseError;
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Oops! Something went wrong",
        text2: "Please double-check your info and try again.",
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
