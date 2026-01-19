import express from "express";
import reportCardController from "../controllers/reportCard.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from "../constants/roles.js";

const router = express.Router();

// Create: Teacher or Admin
router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER),
  reportCardController.createReportCard
);

// Get All: Teacher or Admin
router.get(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER),
  reportCardController.getAllReportCards
);

router.get(
  "/student/:studentId",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER, ROLE_STUDENT),
  reportCardController.getStudentReports
);

router.get(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER, ROLE_STUDENT),
  reportCardController.getReportCardById
);

router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN, ROLE_TEACHER),
  reportCardController.updateReportCard
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(["ADMIN"]),
  reportCardController.deleteReportCard
);

export default router;
