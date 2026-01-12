import authController from "../controllers/auth.controller.js";

import express from "express";

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

export default router;
