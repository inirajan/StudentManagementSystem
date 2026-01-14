import express from "express";

import auth from "../middlewares/auth.js";
import dashboardController from "../controllers/dashboard.controller.js";
import roleBaseAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_STUDENT } from "../constants/roles.js";

const router = express.Router();

router.get(
  "/",
  auth,
  roleBaseAuth(ROLE_STUDENT),
  dashboardController.getStudentDashboard
);

export default router;
