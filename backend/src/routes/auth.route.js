import express from "express";
import { login, logout} from "../controllers/auth.controller.js";
// import { protect} from "../middlewares/authMiddleware.js";

const router = express.Router();


// POST /api/auth/login
router.post("/login", login);
router.post("/logout",  logout);

export default router;
