import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/class", auth, classRoutes);
app.use("/api/assignment", auth, assignmentRoutes);
app.use("/api/report-card", auth, reportCardRoutes);
app.use("/api/student/dashboard", auth, dashboardRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`);
});
