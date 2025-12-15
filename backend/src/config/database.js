import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    const data = await mongoose.connect(config.mongodb_url);

    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

export default connectDB;
