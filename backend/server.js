import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";



const port = process.env.PORT || 5000;

connectDB(); //connecting to database

const app = express();
//route to display homepage
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

