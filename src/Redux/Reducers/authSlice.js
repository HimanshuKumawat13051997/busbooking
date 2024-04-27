import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../features/authActions";

export const authSlice = createSlice({
  name: "authSlice ",
  initialState: {
    useToken: null,
    data: {},
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
