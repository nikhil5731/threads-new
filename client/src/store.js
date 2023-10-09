import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/user/userSlice';
import PostReducer from './features/post/postSlice';
import ChatReducer from './features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    post: PostReducer,
    chat: ChatReducer,
  },
});
