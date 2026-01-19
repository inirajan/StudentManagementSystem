import express from "express";
import multer from "multer";

import assignmentController from "../controllers/assignment.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_STUDENT, ROLE_TEACHER } from "../constants/roles.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  roleBasedAuth(ROLE_TEACHER),
  upload.single("file"),
  assignmentController.createAssignment
);

router.get("/", assignmentController.getAssignmentsByClass);

router.put(
  "/:id",
  roleBasedAuth(ROLE_TEACHER),
  assignmentController.updateAssginment
);

router.delete(
  "/:id",
  roleBasedAuth(ROLE_TEACHER),
  assignmentController.deleteAssignment
);

router.post(
  "/:id/submit",
  upload.single("file"),
  roleBasedAuth(ROLE_STUDENT),
  assignmentController.submitAssignment
);

router.post(
  "/:id/check",
  roleBasedAuth(ROLE_TEACHER),
  assignmentController.checkAssignment
);

export default router;
