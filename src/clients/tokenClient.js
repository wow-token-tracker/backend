import axios from "axios";
import {
  MissingCredentialsError,
  InvalidCredentialsError,
  InvalidRegionError,
  AccessTokenError,
  TokenRetrievalError,
} from "../errors/index.js";

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const regions = ["us", "eu", "kr", "tw"];

// Battle.net API에서 액세스 토큰을 가져오는 함수
const getAccessToken = async () => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new MissingCredentialsError();
  }

  try {
    const res = await axios.post(
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

    return res.data.access_token;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new InvalidCredentialsError();
    }
    throw new AccessTokenError();
  }
};

// Battle.net API에서 리전별 WoW 토큰을 가져오는 함수
const getTokens = async () => {
  try {
    const accessToken = await getAccessToken();

    const tokens = await Promise.all(
      regions.map(async (region) => {
        const res = await axios.get(
          `https://${region}.api.blizzard.com/data/wow/token/?namespace=dynamic-${region}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { price, last_updated_timestamp } = res.data;

        return {
          region,
          price: price / 10000,
          lastUpdatedTimestamp: last_updated_timestamp,
        };
      })
    );

    return tokens;
  } catch (err) {
    if (err.code === "ENOTFOUND") {
      throw new InvalidRegionError();
    }

    if (err instanceof MissingCredentialsError) {
      throw new MissingCredentialsError();
    } else if (err instanceof InvalidCredentialsError) {
      throw new InvalidCredentialsError();
    }

    throw new TokenRetrievalError();
  }
};

export default { getTokens };
