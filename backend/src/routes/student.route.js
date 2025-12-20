import express from "express";

import studentController from "../controllers/student.controller.js";

const router = express.Router();

router.post("/api/student", studentController.createStudent);

router.get("/api/student", studentController.getStudents);

export default router;
