import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import propertyReducer from "./slice/propertySlice";
import auctionReducer from "./slice/auctionSlice";
import registPropertyReducer from "./slice/registPropertySlice";
import savedPropertyReducer from "./slice/savedPropertySlice";
import incompPropertyReducer from "./slice/incompleteProp";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  property: propertyReducer,
  user: userReducer,
  auction: auctionReducer,
  registProperty: registPropertyReducer,
  savedProperty: savedPropertyReducer,
  incompProperty: incompPropertyReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
