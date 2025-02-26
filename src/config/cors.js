const whitelist = process.env.CORS_WHITELIST;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === whitelist) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET"],
};

export default corsOptions;
