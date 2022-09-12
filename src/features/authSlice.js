import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    fullName: null,
    nickName: null,
    email: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.logged = action.payload.logged;
      state.fullName = action.payload.fullName;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
    },
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
