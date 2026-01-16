import express from "express";
import studentController from "../controllers/student.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.post(
  "/",
  roleBasedAuth(["ADMIN"]),
  studentController.createStudentProfile
);

router.get("/", roleBasedAuth(["ADMIN"]), studentController.getStudents);

router.get("/:id", roleBasedAuth(["ADMIN"]), studentController.getStudentById);

router.put(
  "/:id",
  roleBasedAuth(["ADMIN", "STUDENT"]),
  studentController.updatStudent
);

router.delete(
  "/:id",
  roleBasedAuth(["ADMIN"]),
  studentController.deleteStudent
);

export default router;
