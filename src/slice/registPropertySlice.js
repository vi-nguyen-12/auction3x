import { createSlice } from "@reduxjs/toolkit";

const registProp = [];

export const registPropertySlice = createSlice({
  name: "Registered property",
  initialState: registProp,
  reducers: {
    addRegistProp: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    removeRegistProperty: (state, action) => {
      return state.filter((registProp) => registProp.id !== action.payload);
    },
    updateRegistProperty: (state, action) => {
      return state.map((registProp) =>
        registProp.id === action.payload.id ? action.payload : registProp
      );
    },
  },
});

export const { addRegistProp, removeRegistProperty, updateRegistProperty } =
  registPropertySlice.actions;
export default registPropertySlice.reducer;
