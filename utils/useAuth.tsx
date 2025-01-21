import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    dispatch(setUser(user));
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return user;
};

export default useAuth;
