import express from "express";
import bodyParser from "body-parser";

import connectDB from "./config/database.js";
import config from "./config/config.js";

import assignmentRoutes from "./routes/assignment.route.js";
import authRoutes from "./routes/auth.route.js";
import classRoutes from "./routes/class.route.js";
import studentRoutes from "./routes/student.route.js";
import userRoutes from "./routes/user.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/student/dashboard", assignmentRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`);
});
