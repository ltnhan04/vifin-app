import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return user;
};

export default useAuth;
