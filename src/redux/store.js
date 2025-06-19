import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/users/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});