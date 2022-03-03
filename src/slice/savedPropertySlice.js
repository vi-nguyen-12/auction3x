import { createSlice } from "@reduxjs/toolkit";

const savedPropState = {};

export const savedPropertySlice = createSlice({
  name: "savedProperty",
  initialState: savedPropState,
  reducers: {
    addSavedProperty: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    removeSavedProperty: (state, action) => {
      return state.filter((property) => property.id !== action.payload);
    },
    updateSavedProperty: (state, action) => {
      return state.map((property) =>
        property.id === action.payload.id ? action.payload : property
      );
    },
  },
});

export const { addSavedProperty, removeSavedProperty, updateSavedProperty } =
  savedPropertySlice.actions;
export default savedPropertySlice.reducer;