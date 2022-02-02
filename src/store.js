import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import propertyReducer from './slice/propertySlice'
import auctionReducer from './slice/auctionSlice'
import registPropertyReducer from './slice/registPropertySlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import registPropertySlice from './slice/registPropertySlice'

const reducers = combineReducers({
    property: propertyReducer,
    user: userReducer,
    auction: auctionReducer,
    registProperty: registPropertySlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['property', 'auction', 'registProperty'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;