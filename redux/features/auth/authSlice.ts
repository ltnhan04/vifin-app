import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthType } from "@/types/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: null,
  } as AuthType,
  reducers: {
    setUser: (state, action: PayloadAction<AuthType>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = "";
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLogout, clearUser } = authSlice.actions;
export default authSlice.reducer;
