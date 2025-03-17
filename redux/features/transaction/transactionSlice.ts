import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionType } from "@/types/transaction";

interface TransactionState {
  selectedTransaction: ITransactionType | null;
}

const initialState: TransactionState = {
  selectedTransaction: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSelectedTransactionType: (
      state,
      action: PayloadAction<ITransactionType>
    ) => {
      state.selectedTransaction = action.payload;
    },
    clearSelectedTransactionType: (state) => {
      state.selectedTransaction = null;
    },
  },
});

export const { setSelectedTransactionType, clearSelectedTransactionType } =
  transactionSlice.actions;
export default transactionSlice.reducer;
