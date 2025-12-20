import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/database.js";
import studentRoute from "./routes/student.route.js";

dotenv.config();
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
  });
});

app.use("/", studentRoute);

const PORT = process.env.PORT || 5000;

app.listen(() => {
  console.log(`Server running at port: ${PORT}`);
});
