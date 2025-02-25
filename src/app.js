import express from "express";
import "dotenv/config";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";
import tokenRoutes from "./routes/tokenRoute.js";
import scheduleTokenSaveJob from "./crons/tokenCron.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use("/api/tokens", tokenRoutes);

// DB 연결 및 서버 시작
const startApp = async () => {
  try {
    await connectDB();

    scheduleTokenSaveJob();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    logger.error("Failed to start app due to database connection failure.");
    process.exit(1);
  }
};

startApp();
