import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} from "../controllers/class.controller.js";

import {protect, authorize} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/create/", protect, authorize("admin"), createClass);
router.put("/update/:id", protect, authorize("admin"), updateClass);
router.delete("/delete/:id", protect, authorize("admin"), deleteClass);
router.get("/getall/", protect, getAllClasses);
router.get("/getbyid/:id", protect, getClassById);

export default router;
