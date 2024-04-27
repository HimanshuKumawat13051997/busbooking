import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "https://backendbusbooking.onrender.com";

export const buses = createAsyncThunk(
  "buses/fetchedByData",
  async ({ to, from, date }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BaseURL}/api/v1/search-route`,
        { to, from, date },
        config
      );
      localStorage.setItem("businfo", JSON.stringify(data.data));
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const SearchBus = createSlice({
  name: "SearchBus",
  initialState: {
    success: false,
    businfo: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buses.pending, (state) => {
        state.error = null;
      })
      .addCase(buses.fulfilled, (state, action) => {
        state.businfo = action.payload;
        state.success = true;
      })
      .addCase(buses.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { toggleSeatColour } = SearchBus.actions;

export default SearchBus.reducer;
