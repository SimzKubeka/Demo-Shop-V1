import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        // @desc: apiSlice is a slice that is created using createApi from reduxjs/toolkit
        [apiSlice.reducerPath]: apiSlice.reducer
    },  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;