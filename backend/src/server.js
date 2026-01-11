import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import config from "./config/config.js";
import studentRoute from "./routes/student.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api/students", studentRoute);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`);
});
