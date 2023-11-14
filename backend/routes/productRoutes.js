import express  from "express";
import {getProducts, getProductById} from "../controllers/productController.js";

const router = express.Router();

//GENERAL ROUTES:
//1. Route to display all products
router.route("/").get(getProducts);
//2. Route to display a single product
router.route("/:id").get(getProductById);

export default router;