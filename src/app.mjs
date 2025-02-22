import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error occurred while starting the app: ${error.message}`);
    process.exit(1);
  }
};

startApp();
