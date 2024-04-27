import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const PassegerDetails = createSlice({
  name: "PassegerDetails",
  initialState: {
    scheduleId: null,
    passenger_details: {},
    status: null,
    payment_id: null,
    seatnumber: {},
    price: {},
    URL: null,
    error: null,
  },
  reducers: {
    indexstorage: (state, action) => {
      state.scheduleId = action.payload;
    },
    seatst: (state, action) => {
      state.seatnumber = action.payload;
    },
    pricechange: (state, action) => {
      state.price = action.payload;
    },
    passengeraddition: (state, action) => {
      state.passenger_details = action.payload;
    },
    paymentURLL: (state, action) => {
      state.URL = action.payload;
    },
  },
});

export const {
  indexstorage,
  seatst,
  pricechange,
  passengeraddition,
  paymentURLL,
} = PassegerDetails.actions;

export default PassegerDetails.reducer;
