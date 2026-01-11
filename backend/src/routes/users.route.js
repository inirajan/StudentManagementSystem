import express from "express";
const router = express.Router();

import {  createUser,  getAllUsers,  getUserById,  updateUser,  deleteUser} from "../controllers/users.controller.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

router.use(protect);

router.post("/create",  protect, authorize("admin"), createUser);
router.get("/getall",  protect, authorize("admin"), getAllUsers);
router.get("/getuserbyid/:id", protect, authorize("admin"), getUserById);
router.put("/update/:id",  protect, authorize("admin"), updateUser);
router.delete("/delete/:id",  protect, authorize("admin"), deleteUser);

export default router;
