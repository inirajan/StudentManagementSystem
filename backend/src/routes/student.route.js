import express from "express";
import studentController from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", studentController.createStudentProfile);

router.get("/", studentController.getStudents);

router.get("/:id", studentController.getStudentById);

router.put("/:id", studentController.updatStudent);

router.delete("/:id", studentController.deleteStudent);

export default router;
