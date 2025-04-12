import React, { useState } from "react";
import { View } from "react-native";
import { toast } from "sonner-native";
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

          toast.success("Welcome back 👋", {
            description: "You're all set to manage your finances.",
          });
        }
      }
      return googleData;
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      toast.error("Oops! Something went wrong", {
        description: "Please try again later.",
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
