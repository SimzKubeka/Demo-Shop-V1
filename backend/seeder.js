import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";   
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear all data in database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert users data
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Insert products data
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear all data in database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check if the argument is -d
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}

// Run this command in the terminal to import data:
// node backend/seeder.js
// Run this command in the terminal to destroy data:
// node backend/seeder.js -d
// Compare this snippet from backend/config/db.js:
// import mongoose from "mongoose";
