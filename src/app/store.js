import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'features/Auth/userSlice';
import { cartSlice } from 'features/Cart/cartSlice';
import { counterSlice } from '../features/Counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;