import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import propertyReducer from './slice/propertySlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    property: propertyReducer,
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['property']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;