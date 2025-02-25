import axios from "axios";
import {
  MissingCredentialsError,
  InvalidCredentialsError,
  AccessTokenError,
} from "../errors/index.js";

const { CLIENT_ID, CLIENT_SECRET } = process.env;

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
