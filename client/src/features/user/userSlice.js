import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
