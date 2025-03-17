import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  selectedWalletId: string | null;
}

const initialState: WalletState = {
  selectedWalletId: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSelectedWallet: (state, action: PayloadAction<string>) => {
      state.selectedWalletId = action.payload;
    },
    clearSelectedWallet: (state) => {
      state.selectedWalletId = "";
    },
  },
});

export const { setSelectedWallet, clearSelectedWallet } = walletSlice.actions;
export default walletSlice.reducer;
