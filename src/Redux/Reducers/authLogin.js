import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../features/authActions";

const refreshToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userdata = JSON.parse(localStorage.getItem("UserInfo"));

export const authloginSlice = createSlice({
  name: "authloginSlice ",
  initialState: {
    refreshToken,
    data: userdata,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("UserInfo");
      state.data = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authloginSlice.actions;
export default authloginSlice.reducer;
