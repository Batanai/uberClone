import {configureStore} from '@reduxjs/toolkit';
import useReducer from '../slices/navSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
