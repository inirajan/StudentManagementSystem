import express from "express";
import reportCardController from "../controllers/reportCard.controller.js";

const router = express.Router();

router.post("/", reportCardController.createReporCard);

router.get("/:stuentId", reportCardController.getStudentReports);

export default router;
