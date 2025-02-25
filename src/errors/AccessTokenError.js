class AccessTokenError extends Error {
  constructor() {
    super("Failed to get access token.");
  }
}

export default AccessTokenError;
