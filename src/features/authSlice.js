import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    refresh_token: null,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    unSetUserToken: (state) => {
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken, unSetUserToken } = userSlice.actions;

export default userSlice.reducer;