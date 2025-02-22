import cron from "node-cron";
import { saveTokens } from "../services/tokenService.mjs";

const tokenScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
      await saveTokens();
    } catch (error) {
      console.error(error.message);
    }
  });
  console.log("Token scheduler started.");
};

export { tokenScheduler };
