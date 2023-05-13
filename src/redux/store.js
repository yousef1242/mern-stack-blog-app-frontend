import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import postSlice from "./slices/postSlice";
import categoriesSlice from "./slices/categoriesSlice";
import commentSlice from "./slices/commentSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    posts: postSlice,
    category: categoriesSlice,
    comment : commentSlice,
  },
});

export default store;
