import authController from "../controllers/auth.controller.js";

import express from "express";

const router = express.Router();

router.post("/api/login", authController.login);

router.post("/api/register", authController.register);

export default router;
