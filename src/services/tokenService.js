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

// 지역과 기간에 해당하는 토큰을 데이터베이스에서 조회하여 최신 순으로 반환하는 함수
const getTokens = async (region, period) => {
  try {
    const currentTime = new Date();
    let startTime;

    if (period === "1d") {
      startTime = new Date(currentTime.getTime() - 60 * 60 * 24 * 1000); // 하루 전
    } else if (period === "7d") {
      startTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 24 * 1000); // 7일 전
    } else if (period === "30d") {
      startTime = new Date(currentTime.getTime() - 30 * 60 * 60 * 24 * 1000); // 30일 전
    }

    const savedTokens = await Token.find({
      region,
      lastUpdatedTimestamp: { $gte: startTime },
    }).sort({
      lastUpdatedTimestamp: -1, // 최신 순으로 정렬
    });

    const tokens = [];
    for (let i = 0; i < savedTokens.length - 1; i++) {
      const current = savedTokens[i];
      const next = savedTokens[i + 1];

      const priceChange = current.price - next.price; // 가격 차이
      const priceChangeRate = ((priceChange / next.price) * 100).toFixed(2); // 가격 변화율 계산

      const token = {
        price: current.price,
        lastUpdatedTimestamp: current.lastUpdatedTimestamp,
        priceChange,
        priceChangeRate,
      };

      tokens.push(token);
    }

    return tokens;
  } catch (err) {
    logger.error("Failed to get token.");
    logger.error(`${err.stack}`);
    throw err;
  }
};

export default { getTokens };
