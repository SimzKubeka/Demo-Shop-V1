import express  from "express";
import {authUser,
  registerUser,
  logoutUser,
  getsUserProfile,
  updatesUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//ADMIN ROUTES:
//1. Route to display all users 
router.route("/").post(registerUser).get(protect, admin, getUsers);
//2. Route to display a single user
router.route("/:id").get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser);

//GENERAL ROUTES:
//1. Route to login user
router.post("/login", authUser);
//2. Route to logout user
router.post("/logout", logoutUser);
//3. Route to display user profile
router.route("/profile").get(protect, getsUserProfile).put(protect, updatesUserProfile);
 
export default router;