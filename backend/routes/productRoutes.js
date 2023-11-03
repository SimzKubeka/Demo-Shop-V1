import express  from "express";
import {getProducts, getProductById} from "../controllers/productController.js";

const router = express.Router();

//route to display all products
router.route("/").get(getProducts);

//route to display a single product
router.route("/:id").get(getProductById);

export default router;