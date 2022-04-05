import { createSlice } from "@reduxjs/toolkit";

const incompPropertyState = {};

export const incompPropertySlice = createSlice({
  name: "IncompleteProperty",
  initialState: incompPropertyState,
  reducers: {
    addIncompProperty: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    removeIncompProperty: (state, action) => {
      return state.filter((property) => property.id !== action.payload);
    },
    updateIncompProperty: (state, action) => {
      return state.map((property) =>
        property.id === action.payload.id ? action.payload : property
      );
    },
  },
});

export const { addIncompProperty, removeIncompProperty, updateIncompProperty } =
  incompPropertySlice.actions;
export default incompPropertySlice.reducer;
