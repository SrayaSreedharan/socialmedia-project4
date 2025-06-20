// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const userId = localStorage.getItem("userId");

// export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
//   const response = await axios.get(`https://reactecomapi.onrender.com/socioauth/user/${userId}`);
//   return response.data;
// });

// export const updateUserProfile = createAsyncThunk('user/updateProfile', async (formData) => {
//   const response = await axios.put(`https://reactecomapi.onrender.com/post/updateprofile/${userId}`, formData);
//   return response.data;
// });

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     data: null,
//     status: 'idle',
//     error: null
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.data = action.payload;
//       });
//   },
// });

// export default profileSlice.reducer;