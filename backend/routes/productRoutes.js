import express  from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

//route to display all products
router.get("/", asyncHandler(async(req, res) => {
  const products = await Product.find({});
  res.send(products);
}));

//route to display a single product
router.get("/:id", asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

	if(product) {
		return res.json(product);
	}	
		res.status(404).json({message: "Product not found"});
}));

export default router;