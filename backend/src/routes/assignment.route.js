import express from "express";
import multer from "multer";

import assignmentController from "../controllers/assignment.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  roleBasedAuth(["TEACHER"]),
  upload.single("file"),
  assignmentController.createAssignment
);

router.get("/", assignmentController.getAssignmentsByClass);

router.put(
  "/:id",
  roleBasedAuth(["TEACHER"]),
  assignmentController.updateAssginment
);

router.delete(
  "/:id",
  roleBasedAuth(["TEACHER"]),
  assignmentController.deleteAssignment
);

router.post(
  "/:id/submit",
  upload.single("file"),
  roleBasedAuth(["STUDENT"]),
  assignmentController.submitAssignment
);

router.post(
  "/:id/check",
  roleBasedAuth(["STUDENT"]),
  assignmentController.checkAssignment
);

export default router;
