import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedin: false,
  token: null,
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
  }
}
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;