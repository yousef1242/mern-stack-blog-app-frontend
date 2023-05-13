import { createSlice } from '@reduxjs/toolkit'




export const profileSlice = createSlice({
  name: 'profile',
  initialState : {
    profile : null,
    loading : false,
    isProfileDeleted : false,
  },
  reducers: {
    setProfile(state,action){
        state.profile = action.payload
    },
    setProfilePhoto(state,action){
        state.profile.imageProfile = action.payload
    },
    setProfileAction(state,action){
      state.profile = action.payload
    },
    setLoading(state){
      state.loading = true
    },
    clearLoading(state){
      state.loading = false
    },
    setIsProfileDeleted(state){
      state.isProfileDeleted = true
      state.loading = false
    },
    clearIsProfileDeleted(state){
      state.isProfileDeleted = false
    },
  }})

// Action creators are generated for each case reducer function
export const { setProfile, setProfilePhoto, setProfileAction, setIsProfileDeleted, setLoading, clearIsProfileDeleted, clearLoading} = profileSlice.actions

export default profileSlice.reducer