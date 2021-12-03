import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import propertyReducer from './slice/propertySlice'

export default configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer
  },
})