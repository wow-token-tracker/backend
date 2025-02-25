class TokenRetrievalError extends Error {
  constructor() {
    super("Failed to get tokens.");
  }
}

export default TokenRetrievalError;
