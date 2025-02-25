class MissingCredentialsError extends Error {
  constructor() {
    super("CLIENT_ID or CLIENT_SECRET is missing in the .env file.");
  }
}

export default MissingCredentialsError;
