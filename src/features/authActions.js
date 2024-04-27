import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "https://backendbusbooking.onrender.com";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, email, firstname, lastname, password, mobilenumber },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/users/register`,
        { username, email, firstname, lastname, password, mobilenumber },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/users/login`,
        { email, password },
        config
      );

      const { user, refreshToken } = data.data;
      // store user's token in local storage
      localStorage.setItem("userToken", refreshToken);
      localStorage.setItem("UserInfo", JSON.stringify(user));
      const newdata = {
        user,
        refreshToken,
      };

      return newdata;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
