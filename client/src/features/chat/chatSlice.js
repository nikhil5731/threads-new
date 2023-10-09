import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  selectedConversation: {
    _id: null,
    userId: null,
    username: null,
    userProfilePic: null,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, { payload }) => {
      state.conversations = payload;
    },
    addConversations: (state, { payload }) => {
      state.conversations.push(payload);
    },
    updateLastMessageConversations: (state, { payload }) => {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === state.selectedConversation._id) {
          conversation = {
            ...conversation,
            lastMessage: {
              text: payload.messageText,
              sender: payload.sender,
            },
          };
        }
        return conversation;
      });
    },

    setSelectedConversation: (state, { payload }) => {
      state.selectedConversation = payload;
    },
  },
});

export const {
  setConversations,
  addConversations,
  updateLastMessageConversations,
  setSelectedConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
