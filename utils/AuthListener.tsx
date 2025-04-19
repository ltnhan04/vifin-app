import { useState, useEffect } from "react";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";
import type { CustomerType } from "@/types/customer";

const AuthListener = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user: storedData } = useAppSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const providerData = user.providerData.find((data) =>
        ["password", "google.com"].includes(data.providerId)
      );

      if (providerData) {
        const userData: CustomerType = {
          full_name: providerData.displayName || "",
          avatar: providerData.photoURL || "",
          gender: storedData?.gender || "male",
          email: providerData.email || "",
          customerId: user.uid,
          provider: providerData.providerId,
        };

        try {
          const tokenResult = await user.getIdTokenResult(true);
          console.log(tokenResult.token);
          const tokenExpiration = new Date(tokenResult.expirationTime);
          const currentTime = new Date();

          if (tokenExpiration < currentTime) {
            dispatch(clearUser());
            router.push("/(root)/(auth)/sign-in");
          } else {
            dispatch(setUser({ user: userData, token: tokenResult.token }));
            router.replace("/(root)/(tabs)/home");
          }
        } catch (error) {
          console.error("Error fetching token:", error);
          dispatch(clearUser());
          router.replace("/(root)/(auth)/sign-in");
        }
      } else {
        dispatch(clearUser());
        router.replace("/(root)/(auth)/sign-in");
      }
    }
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return children;
};

export default AuthListener;
