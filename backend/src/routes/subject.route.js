import express from "express";
import subjectController from "../controllers/subject.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

// Only Admins can create or delete subjects
router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  subjectController.createSubject,
);
router.get("/", auth, subjectController.getAllSubjects);
router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  subjectController.deleteSubject,
);

export default router;
