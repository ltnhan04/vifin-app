import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
      },
    );
    return () => unsubscribe();
  }, []);
  return user;
};

export default useAuth;
