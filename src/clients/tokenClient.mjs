import axios from "axios";

const { CLIENT_ID, CLIENT_SECRET } = process.env;

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
