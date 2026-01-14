import express from "express";
import assignmentController from "../controllers/assignment.controller.js";

const router = express.Router();

router.post("/", assignmentController.createAssignment);

router.get("/", assignmentController.getAssignmentsByClass);

router.put("/:id", assignmentController.updateAssginment);

router.delete("/:id", assignmentController.deleteAssignment);

export default router;
