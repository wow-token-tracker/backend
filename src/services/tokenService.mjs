import Token from "../models/token.mjs";
import { getTokens } from "../clients/tokenClient.mjs";

const saveTokens = async () => {
  try {
    const tokens = await getTokens();

    await Promise.all(
      tokens.map(async (token) => {
        const existingToken = await checkTokenExists(
          token.region,
          token.lastUpdatedTimestamp
        );

        if (!existingToken) {
          const newToken = new Token(token);
          await newToken.save();
        }
      })
    );
  } catch (error) {
    throw new Error(`Error saving tokens: ${error.message}`);
  }
};

const findTokens = async (region, period) => {
  try {
    const currentTime = new Date();
    const periods = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };
    const startTime = new Date(currentTime.getTime() - periods[period]);

    const savedTokens = await Token.find({
      region,
      lastUpdatedTimestamp: { $gte: startTime.getTime() },
    }).sort({
      lastUpdatedTimestamp: -1,
    });

    const tokens = [];
    for (let i = 0; i < savedTokens.length - 1; i++) {
      const current = savedTokens[i];
      const next = savedTokens[i + 1];

      const priceChange = current.price - next.price;
      const priceChangeRate = ((priceChange / next.price) * 100).toFixed(2);

      const token = {
        price: current.price,
        lastUpdatedTimestamp: current.lastUpdatedTimestamp,
        priceChange,
        priceChangeRate,
      };

      tokens.push(token);
    }

    return tokens;
  } catch (error) {
    throw new Error("Failed to get tokens from DB.");
  }
};

const checkTokenExists = async (region, lastUpdatedTimestamp) => {
  try {
    const token = await Token.findOne({
      region,
      lastUpdatedTimestamp,
    });

    return !!token;
  } catch (error) {
    throw new Error("Failed to check if token exists.");
  }
};

export { saveTokens, findTokens };
