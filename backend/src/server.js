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


app.use(express.json());

app.use("/", studentRoute);

const PORT = process.env.PORT || 5000;

app.listen(() => {

app.listen(config.port,() => {
  console.log(`Server running at port: ${PORT}`);
});
