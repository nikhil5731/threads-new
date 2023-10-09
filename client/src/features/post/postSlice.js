import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
    },
    removePost: (state) => {
      state.posts = initialState;
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    likePost: (state, { payload }) => {
      const post = state.posts.find((post) => post._id === payload.postId);
      post.likes.push(payload.userId);
    },
    unlikePost: (state, { payload }) => {
      const post = state.posts.find((post) => post._id === payload.postId);
      post.likes = post.likes.filter((id) => id !== payload.userId);
    },
    addReply: (state, { payload }) => {
      const post = state.posts.find((post) => post._id === payload.postId);
      post.replies = [...post.replies, payload.reply];
    },
  },
});

export const {
  setPost,
  removePost,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  addReply,
} = postSlice.actions;

export default postSlice.reducer;
