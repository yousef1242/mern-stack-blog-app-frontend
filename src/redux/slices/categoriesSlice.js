import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories : null,
    categoryMessage : null,
  },
  reducers: {
    setCategories(state,action){
        state.categories = action.payload
    },
    deletedcategoryMessage(state,action){
      state.categoryMessage = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories, deletedcategoryMessage } = categorySlice.actions;

export default categorySlice.reducer;
