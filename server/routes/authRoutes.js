import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controller/authController.js";
import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/delete").delete(authenticateUser, deleteUser);

export default router;
