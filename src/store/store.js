import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from './slices/checkoutSlice';

export default configureStore({
  reducer: {
    itemsInCheckout: checkoutReducer,
  },
});