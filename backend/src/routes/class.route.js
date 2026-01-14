import express from "express";
import classController from "../controllers/class.controller.js";

const router = express.Router();

router.post("/", classController.createClass);

router.put("/:id", classController.updateClass);

router.get("/", classController.getAllClasses);

router.get("/:id", classController.getClassById);

export default router;
