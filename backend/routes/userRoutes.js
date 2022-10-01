import express from "express";
import {
  authUser,
  deleteUser,
  getuserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controller/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getuserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
