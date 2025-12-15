import express from "express";
import config from "./config/config.js";

import connectDB from "./config/database.js";
import studentRoute from "./routes/student.route.js";

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
  });
});

app.use("/", studentRoute);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port} `);
});
