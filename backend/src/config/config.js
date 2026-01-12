import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || 6000,
  mongodb_url: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
