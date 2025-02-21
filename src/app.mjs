import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(() => {
    console.error("Failed to connect to MongoDB.");
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
