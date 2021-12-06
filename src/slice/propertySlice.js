import { createSlice } from "@reduxjs/toolkit";

const propertyState = {};

export const propertySlice = createSlice({
  name: "property",
  initialState: propertyState,
  reducers: {
    addProperty: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    removeProperty: (state, action) => {
      return state.filter((property) => property.id !== action.payload);
    },
    updateProperty: (state, action) => {
      return state.map((property) =>
        property.id === action.payload.id ? action.payload : property
      );
    },
  },
});

export const { addProperty, removeProperty, updateProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
