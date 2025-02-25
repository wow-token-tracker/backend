import Token from "../models/token.js";
import tokenClient from "../clients/tokenClient.js";
import logger from "../config/logger.js";

// 리전별 WoW 토큰을 데이터베이스에 저장하는 함수
const saveTokens = async () => {
  try {
    const tokens = await tokenClient.getTokens();

    await Promise.all(
      tokens.map(async (token) => {
        const savedToken = await Token.findOne({
          region: token.region,
          lastUpdatedTimestamp: token.lastUpdatedTimestamp,
        });

        if (!savedToken) {
          const newToken = new Token(token);
          await newToken.save();
        }
      })
    );
  } catch (err) {
    logger.error("Failed to save tokens.");
    logger.error(`${err.stack}`);
  }
};
