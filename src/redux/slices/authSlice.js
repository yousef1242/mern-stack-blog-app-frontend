import { createSlice } from '@reduxjs/toolkit'




export const authSlice = createSlice({
  name: 'auth',
  initialState : {
    user : localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")) : null , //convert string to object
    registerMessage : null,
    AllUsers : null,
  },
  reducers: {
    login(state,action){
        state.user = action.payload
        state.registerMessage = null
    },
    logout(state,action){
      state.user = null
    },
    register(state,action){
      state.registerMessage = action.payload
    },
    setUserPhoto(state,action){
      state.user.imageProfile = action.payload
    },
    setAuthAction(state,action){
      state.user.username = action.payload
    },
    setAllUsers(state,action){
      state.AllUsers = action.payload
    },
  }})

// Action creators are generated for each case reducer function
export const { login, logout, register, setUserPhoto, setAuthAction, setAllUsers } = authSlice.actions

export default authSlice.reducer