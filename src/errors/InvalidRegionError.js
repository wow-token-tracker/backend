class InvalidRegionError extends Error {
  constructor() {
    super("Invalid region provided. Allowed regions are us, eu, kr, tw.");
  }
}

export default InvalidRegionError;
