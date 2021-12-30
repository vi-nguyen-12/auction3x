import { createSlice } from "@reduxjs/toolkit";

const auctionState = {};

export const auctionSlice = createSlice({
  name: "auction",
  initialState: auctionState,
  reducers: {
    addAuction: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    removeAuction: (state, action) => {
      return state.filter((auction) => auction.id !== action.payload);
    },
    updateAuction: (state, action) => {
      return state.map((auction) =>
        auction.id === action.payload.id ? action.payload : auction
      );
    },
  },
});

export const { addAuction, removeAuction, updateAuction} =
  auctionSlice.actions;
export default auctionSlice.reducer;