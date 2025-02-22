import mongoose from "mongoose";

const { MONGO_URI } = process.env;

const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment variables.");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB.");
  }
};

export { connectDB };
