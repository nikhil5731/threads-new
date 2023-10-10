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
      let conversation = state.conversations.find(
        (c) => c._id === payload.conversationId
      );

      if (conversation) {
        conversation.lastMessage = {
          text: payload.messageText,
          sender: payload.sender,
        };
      }
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
