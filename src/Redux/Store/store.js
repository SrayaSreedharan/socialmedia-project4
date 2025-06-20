import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from '../Slice/Authslice';
// import profileReducer from '../Slice/Profileslice';

export const store=configureStore({
    reducer:{
        user: signupReducer,
        // profile: profileReducer,
    },
})