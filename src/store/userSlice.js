import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../utils/storage";

const initialState = {
  info: getUser(),  //  restore user if exists
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.info = action.payload; // e.g. { id, name, email, token }
    },
    logout(state) {
      state.info = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

