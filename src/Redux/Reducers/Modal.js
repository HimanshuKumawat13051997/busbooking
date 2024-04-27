import { createSlice } from "@reduxjs/toolkit";

export const ModalMan = createSlice({
  name: "ModalMan",
  initialState: false,
  reducers: {
    openandcloseLoginModal: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { openandcloseLoginModal } = ModalMan.actions;

export default ModalMan.reducer;
