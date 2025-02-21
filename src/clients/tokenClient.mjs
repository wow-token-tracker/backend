import axios from "axios";

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const regions = ["us", "eu", "kr", "tw"];

const getAccessToken = async () => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing CLIENT_ID or CLIENT_SECRET in environment variables."
    );
  }

  try {
    const response = await axios.post(
      "https://oauth.battle.net/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to get access token.");
  }
};

const getTokens = async () => {
  try {
    const accessToken = await getAccessToken();

    const tokens = await Promise.all(
      regions.map((region) => {
        return getTokenForRegion(region, accessToken);
      })
    );

    return tokens;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTokenForRegion = async (region, accessToken) => {
  try {
    const response = await axios.get(
      `https://${region}.api.blizzard.com/data/wow/token/?namespace=dynamic-${region}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { price, last_updated_timestamp } = response.data;

    return {
      region,
      price: price / 10000,
      lastUpdatedTimestamp: last_updated_timestamp,
    };
  } catch (error) {
    throw new Error(`Failed to get token from ${region} region.`);
  }
};

export { getTokens };
