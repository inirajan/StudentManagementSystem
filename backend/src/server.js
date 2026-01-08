import express from "express";
import config from "./config/config.js";
<<<<<<< HEAD
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import studentRoute from "./routes/student.route.js";
import userRoute from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js";
=======

import connectDB from "./config/database.js";
import studentRoute from "./routes/student.route.js";
>>>>>>> main

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
  });
});

<<<<<<< HEAD
app.use(cookieParser());
app.use(express.json());

app.use("/", studentRoute);
app.use("/api/users", userRoute); 
app.use("/api/auth", authRoutes);

app.listen(config.port,() => {
  console.log(`Server running at port: ${config.port}`);
=======

app.use(express.json());
app.use("/", studentRoute);

const PORT = process.env.PORT || 5000;

app.listen(config.port,() => {
  console.log(`Server running at port: ${PORT}`);
>>>>>>> main
});
