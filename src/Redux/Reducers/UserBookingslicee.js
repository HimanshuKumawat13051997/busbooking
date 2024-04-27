import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findhistory = createAsyncThunk(
  "find/historybyid",
  async (_, { rejectWithValue }) => {
    try {
      const id = JSON.parse(localStorage.getItem("UserInfo"))._id;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.get(
        `https://backendbusbooking.onrender.com/api/v1/${id}`,
        config
      );

      return data.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const UserBookingSlice = createSlice({
  name: "UserBookingSlice",
  initialState: {
    error: null,
    hist: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findhistory.pending, (state) => {
        state.error = null;
      })
      .addCase(findhistory.fulfilled, (state, action) => {
        state.hist = action.payload;
      })
      .addCase(findhistory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default UserBookingSlice.reducer;
