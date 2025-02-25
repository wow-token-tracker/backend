class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid CLIENT_ID or CLIENT_SECRET.");
  }
}

export default InvalidCredentialsError;
