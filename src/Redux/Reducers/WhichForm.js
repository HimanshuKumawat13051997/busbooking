import { createSlice } from "@reduxjs/toolkit";

const WhichForm = createSlice({
  name: "WhichForm",
  initialState: "",
  reducers: {
    changeform: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { changeform } = WhichForm.actions;

export default WhichForm.reducer;
