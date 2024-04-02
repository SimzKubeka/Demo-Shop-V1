import express from "express";
import {
 addOrderItems,
 getOrderById,
 updateOrderToPaid,
 getMyOrders,
 getOrders,
 updateOrderToDelivered,
} from "../controllers/orderController.js";
import {protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//ADMIN 1. Route to create new orders
router
 .route("/")
 .post(protect, addOrderItems)
 .get(protect, admin, getOrders);

//2. Route to get logged in user orders
router
 .route("/myorders")
 .get(protect, getMyOrders);

//3. Route to get order by id
router
 .route("/:id")
 .get(protect, getOrderById);

//4. Route to update order to paid
router
 .route("/:id/pay")
 .put(protect, updateOrderToPaid);

//ADMIN 5. Route to update order to delivered
router
 .route("/:id/deliver")
 .put(protect, admin, updateOrderToDelivered);

export default router;
