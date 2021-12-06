import { createSlice } from '@reduxjs/toolkit'


const userState={firstName:"",lastName:"",isKYC:false}
const propertyState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        login: (state, action)=>{
            if(login){
            return state={...action.payload}
            }
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {login, addProperties } = userSlice.actions
  export default userSlice.reducer