import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


const port = process.env.PORT || 5000;

connectDB(); //connecting to database

const app = express();
//middleware to parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to parse cookies
app.use(cookieParser());

//route to display homepage
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//paypal route
app.get("/api/config/paypal", (req, res) =>
  res.send({clientId: process.env.PAYPAL_CLIENT_ID})
);

//middleware errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

