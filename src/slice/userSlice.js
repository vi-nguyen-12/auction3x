import { createSlice } from "@reduxjs/toolkit";

const userState = { firstName: "", lastName: "", isKYC: false };

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    login: (state, action) => {
      if (login) {
        return (state = { ...action.payload });
      }
    },
    logout: (state, action) => {
      return (state = { firstName: "", lastName: "", isKYC: false });
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
