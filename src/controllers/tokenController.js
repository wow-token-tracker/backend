import tokenService from "../services/tokenService.js";

const getTokens = async (req, res) => {
  try {
    const { region, period } = req.query;
    const tokens = await tokenService.getTokens(region, period);

    return res.status(200).json({
      data: tokens,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default { getTokens };
