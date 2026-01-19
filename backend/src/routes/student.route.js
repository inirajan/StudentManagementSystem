import express from "express";
import studentController from "../controllers/student.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import auth from "../middlewares/auth.js";
import { ROLE_ADMIN, ROLE_STUDENT } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  studentController.createStudentProfile,
);

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), studentController.getStudents);

router.get(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  studentController.getStudentById,
);

router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_STUDENT),
  studentController.updatStudent,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  studentController.deleteStudent,
);

export default router;
