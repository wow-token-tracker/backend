import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  region: {
    type: String,
    required: true,
    enum: ["us", "eu", "kr", "tw"],
  },
  price: {
    type: Number,
    required: true,
  },
  lastUpdatedTimestamp: {
    type: Number,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
