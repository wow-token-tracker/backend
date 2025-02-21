import Token from "../models/token.mjs";

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
