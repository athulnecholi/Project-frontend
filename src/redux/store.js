import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/users/userSlice';
import turfReducer from '../redux/features/turfs/turfSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    turf: turfReducer,
  },
});