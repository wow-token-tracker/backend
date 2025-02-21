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

export { saveTokens };
