import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postCount: null,
    postCate: [],
    loading: false,
    isPostCreated: false,
    post : null,
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    getPostsCount(state, action) {
      state.postCount = action.payload;
    },
    getPostsCate(state, action) {
      state.postCate = action.payload;
    },
    setPostLoading(state, action) {
      state.loading = true;
    },
    clearPostLoading(state, action) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
    },
    getSinglePost(state, action) {
      state.post = action.payload;
    },
    setLike(state,action){
      state.post.likes = action.payload.likes
    },
    addCommentToPost(state,action){
      state.post.comments.push(action.payload)
    },
    updateCommentPost(state,action){
      state.post.comments = state.post.comments.map((comment) => 
        comment._id === action.payload._id ? action.payload : comment
      )
    },
    deleteCommentPost(state,action){
      const comment = state.post.comments.find(c => c._id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1) // delete this comment
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  getPosts,
  getPostsCount,
  getPostsCate,
  clearPostLoading,
  setIsPostCreated,
  setPostLoading,
  clearIsPostCreated,
  getSinglePost,
  setLike,
  addCommentToPost,
  updateCommentPost,
  deleteCommentPost,
} = postSlice.actions;

export default postSlice.reducer;
