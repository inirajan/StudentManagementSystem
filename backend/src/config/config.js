import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || 5000,
  mongodb_url: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;
