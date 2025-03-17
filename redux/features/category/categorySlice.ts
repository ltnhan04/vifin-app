import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategoryId: string | null;
}

const initialState: CategoryState = {
  selectedCategoryId: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategoryId = "";
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
