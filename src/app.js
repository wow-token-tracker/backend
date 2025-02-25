import express from "express";
import "dotenv/config";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());

// DB 연결 설정
connectDB();

// 서버 시작
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
