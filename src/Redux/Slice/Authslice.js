import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Signupapi = "https://reactecomapi.onrender.com/socioauth/register";

export const signupUser = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(Signupapi, userData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Signup failed with status: ${response.status}`);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const SignupSlice = createSlice({
  name: 'signup',
  initialState: {
    status: 'idle',
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});
export const signupReducer = SignupSlice.reducer;
