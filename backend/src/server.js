import express from "express";
import bodyParser from "body-parser";

import connectDB from "./config/database.js";
import config from "./config/config.js";

import assignmentRoutes from "./routes/assignment.route.js";
import authRoutes from "./routes/auth.route.js";
import classRoutes from "./routes/class.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import reportCardRoutes from "./routes/reportCard.route.js";
import studentRoutes from "./routes/student.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import userRoutes from "./routes/user.route.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

connectDB();

connectCloudinary();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", auth, userRoutes);
app.use("/api/student", auth, studentRoutes);
app.use("/api/teacher", auth, teacherRoutes);
app.use("/api/class", classRoutes);
app.use("/api/assignment", auth, assignmentRoutes);
app.use("/api/report-card", reportCardRoutes);
app.use("/api/student/dashboard", dashboardRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`);
});
