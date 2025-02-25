import cron from "node-cron";
import tokenService from "../services/tokenService.js";
import logger from "../config/logger.js";

// 매 분마다 토큰을 저장하는 작업
const scheduleTokenSaveJob = () => {
  logger.info("Token save job is running.");
  cron.schedule("* * * * *", async () => {
    try {
      await tokenService.saveTokens();
    } catch (err) {
      logger.error("An error occurred while saving tokens in the cron job.");
      logger.error(`${err.stack}`);
    }
  });
};

export default scheduleTokenSaveJob;
