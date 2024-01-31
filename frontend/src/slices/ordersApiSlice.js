import { ORDER_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints(
  {
    endpoints: (builder) => ({

      //@desc: Create new order
      createOrder: builder.mutation({
        query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: {...order},
        }),
      }),

    //@desc: Fetch all orders
      getOrders: builder.query({
        query: () => ({
        url: ORDER_URL,
        }),
        keepUnusedDataFor: 5,
      }),
    
      //@desc: Fetch order by id
      getOrderDetails: builder.query({
        query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        }),
        keepUnusedDataFor: 5,
      }),

      //@desc: Pay for order
      payOrder: builder.mutation({
        query: (orderId, paymentResult) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
        }),
      }),
    
      //@desc: Deliver order
      deliverOrder: builder.mutation({
        query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
        }),
      }),
    }),
  }
  );

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderDetailsQuery,  usePayOrderMutation, useDeliverOrderMutation } = ordersApiSlice;