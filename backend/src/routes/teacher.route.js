import express from "express";
import teacherController from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/", teacherController.createStudentProfile);

router.get("/", teacherController.getAllTeachers);

router.get("/:id", teacherController.getStudentById);

router.put("/:id", teacherController.updateTeacher);

router.delete("/:id", teacherController.deleteTeacher);

router.post("/:id/assign-subject", teacherController.assignSubjectToTeacher);

export default router;
