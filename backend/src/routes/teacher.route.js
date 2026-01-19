import express from "express";
import teacherController from "../controllers/teacher.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import auth from "../middlewares/auth.js";
import { ROLE_ADMIN, ROLE_TEACHER } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  teacherController.createStudentProfile,
);

router.get(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  teacherController.getAllTeachers,
);

router.get(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  teacherController.getStudentById,
);

router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER),
  teacherController.updateTeacher,
);

router.get(
  "/my-student",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER),
  teacherController.getClassStudents,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_TEACHER),
  teacherController.deleteTeacher,
);

router.post(
  "/:id/assign-subject",
  roleBasedAuth(ROLE_TEACHER),
  teacherController.assignSubjectToTeacher,
);

export default router;
