import dotenv from "dotenv";

dotenv.config();

const config = {
  appName: process.env.APP_NAME || "Student API",
  port: process.env.PORT || 6000,
  mongoURI: process.env.MONGO_URI
};

export default config;
