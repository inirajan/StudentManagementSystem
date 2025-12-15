import express from "express";

import studentController from "../controllers/student.controller.js";

const router = express.Router();

router.post("/api/students", studentController.createStudent);

router.post("/api/students", studentController.getStudents);

export default router;
