import { configureStore } from "@reduxjs/toolkit";
import ModalMan from "./Reducers/Modal";
import WhichForm from "./Reducers/WhichForm";
import authSlice from "./Reducers/authSlice";
import authloginSlice from "./Reducers/authLogin";
import searchbus from "./Reducers/searchbus";
import PassegerDetails from "./Reducers/passengerslice";
import UserBookingSlice from "./Reducers/UserBookingslicee";

export default configureStore({
  reducer: {
    Modal: ModalMan,
    formc: WhichForm,
    auth: authSlice,
    authlog: authloginSlice,
    buses: searchbus,
    passenger: PassegerDetails,
    history: UserBookingSlice,
  },
});
