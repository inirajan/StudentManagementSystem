import express from "express";
import teacherController from "../controllers/teacher.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.post(
  "/",
  roleBasedAuth(["ADMIN"]),
  teacherController.createStudentProfile
);

router.get("/", roleBasedAuth(["ADMIN"]), teacherController.getAllTeachers);

router.get("/:id", roleBasedAuth(["ADMIN"]), teacherController.getStudentById);

router.put("/:id", roleBasedAuth(["ADMIN"]), teacherController.updateTeacher);

router.get(
  "/my-student",
  roleBasedAuth(["ADMIN", "TEACHER"]),
  teacherController.getClassStudents
);

router.delete(
  "/:id",
  roleBasedAuth(["ADMIN"]),
  teacherController.deleteTeacher
);

router.post(
  "/:id/assign-subject",
  roleBasedAuth(["ADMIN"]),
  teacherController.assignSubjectToTeacher
);

export default router;
