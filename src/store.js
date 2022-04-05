import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import propertyReducer from "./slice/propertySlice";
import auctionReducer from "./slice/auctionSlice";
import registPropertyReducer from "./slice/registPropertySlice";
import savedPropertyReducer from "./slice/savedPropertySlice";
import incompPropertyReducer from "./slice/incompleteProp";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  property: propertyReducer,
  user: userReducer,
  auction: auctionReducer,
  registProperty: registPropertyReducer,
  savedProperty: savedPropertyReducer,
  incompProperty: incompPropertyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "property",
    "auction",
    "registProperty",
    "savedProperty",
    "incompProperty",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
