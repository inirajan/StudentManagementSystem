import express from "express";

import studentController from "../controllers/student.controller.js";
import { ROLES_STUDENT } from "../constants/roles.js";
import roleBasedAuth from "../middlewares/rolebBasedAuth.js";

const router = express.Router();

router.post(
  "/api/students",
  roleBasedAuth([ROLES_STUDENT]),
  studentController.createStudent
);

router.get("/api/students", studentController.getStudents);

router.get("/api/students/:id", studentController.getStudentById);

router.put("/api/students/:id", studentController.updateStudent);

router.delete("/api/students/:id", studentController.deleteStudent);

export default router;
