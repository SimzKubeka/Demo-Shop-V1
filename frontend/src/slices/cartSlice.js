import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
 ? JSON.parse(localStorage.getItem("cart"))
 : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "PayPal",
   };

const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  //@desc: add item to cart
  addToCart: (state, action) => {
   const item = action.payload;
   const existItem = state.cartItems.find((x) => x._id === item._id );

   if (existItem) {
    state.cartItems = state.cartItems.map((x) =>
     x._id === existItem._id ? item : x
    );
   } else {
    state.cartItems = [...state.cartItems, item];
   }

    return updateCart(state);
  },
  //@desc: remove item from cart
  removeFromCart: (state, action) => {
   const id = action.payload;
   state.cartItems = state.cartItems.filter((x) => x._id !== id);

   return updateCart(state);
  },
  //@desc: save shipping address
  saveShippingAddress: (state, action) => {
   state.shippingAddress = action.payload;
   return updateCart(state);
  },

  //@desc: save payment method
  savePaymentMethod: (state, action) => {
   state.paymentMethod = action.payload;
   return updateCart(state);
  },

  //@desc: clear cart items
  clearCartItems: (state) => {
   state.cartItems = [];
   return updateCart(state);
  },
 },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
