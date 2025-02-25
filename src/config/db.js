import mongoose from "mongoose";
import logger from "./logger.js";

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("Successfully connected to MongoDB");
  } catch (err) {
    logger.error(`Failed to connect MongoDB. ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
