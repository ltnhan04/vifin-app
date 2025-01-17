import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type AuthType = {
  user: FirebaseAuthTypes.User | null;
  isLoggedIn: boolean;
};
