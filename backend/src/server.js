import express from "express";
import bodyParser from "body-parser";

import config from "./config/config.js";
import connectDB from "./config/database.js";
import studentRoute from "./routes/student.route.js";

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/", studentRoute);

app.listen(config.port, () => {
  console.log(`Server is running in port: ${config.port}`);
});
