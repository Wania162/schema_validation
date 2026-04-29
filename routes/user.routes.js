import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", createUser);       // Create
router.get("/", getUsers);                // Read All
router.get("/:id", getUserById);          // Read One
router.put("/:id", updateUser);           // Update
router.delete("/:id", deleteUser);        // Delete

export default router;