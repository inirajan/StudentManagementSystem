import express from "express";
import bodyParser from "body-parser";

import connectDB from "./config/database.js";

import userRoute from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js";


const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`);
});
