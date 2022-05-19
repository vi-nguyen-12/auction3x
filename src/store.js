import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import savedPropertyReducer from "./slice/savedPropertySlice";
import incompPropertyReducer from "./slice/incompleteProp";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  savedProperty: savedPropertyReducer,
  incompProperty: incompPropertyReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
