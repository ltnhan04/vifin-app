import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import type { AuthType } from "@/types/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  } as AuthType,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
