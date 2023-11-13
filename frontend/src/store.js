import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
 reducer: {
  // @desc: apiSlice is a slice that is created using createApi from reduxjs/toolkit
  [apiSlice.reducerPath]: apiSlice.reducer,

  // @desc: cartSliceReducer is a slice that is created using createSlice from reduxjs/toolkit
  cart: cartSliceReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
   apiSlice.middleware
  ),
 devTools: true,
});

export default store;
