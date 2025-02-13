import { useState, useEffect } from "react";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";

const AuthListener = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      const expirationTime = new Date(tokenResult.expirationTime);
      if (expirationTime < new Date()) {
        dispatch(clearUser());
        router.push("/(auth)/sign-in");
      } else {
        dispatch(setUser({ user: user, token: tokenResult.token }));
        router.replace("/(tabs)/home");
      }
    } else {
      dispatch(clearUser());
      router.replace("/(auth)/sign-in");
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
