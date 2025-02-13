import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type AuthType = {
  token: string;
  user: FirebaseAuthTypes.User | null;
};
