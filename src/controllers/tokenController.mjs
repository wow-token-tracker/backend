import { findTokens } from "../services/tokenService.mjs";

const getTokens = async (request, response) => {
  const { region, period } = request.query;

  try {
    const tokens = await findTokens(region, period);
    return response.status(200).json({
      data: tokens,
    });
  } catch (error) {
    return response.status(500).json({
      error: "Internal server error.",
    });
  }
};

export { getTokens };
