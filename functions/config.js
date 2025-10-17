/**
 * Q-Deli Functions configuration and environment checks.
 * Ensures required environment variables are present and sets CORS.
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');

/**
 * Validate required environment variables.
 * Throws if any critical variable is missing.
 */
function verifyEnv() {
  const required = [
    'FIREBASE_PROJECT_ID',
    'CLAUDE_API_KEY',
    'YOUTUBE_API_KEY',
    'GOOGLE_SPEECH_API_KEY'
  ];

  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    // In CI/tests we don't fatal, but log warning. In prod, throw.
    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line no-console
      console.warn('[WARN] Missing env vars in test:', missing);
    } else {
      throw new Error(`Missing required env vars: ${missing.join(', ')}`);
    }
  }
}

/**
 * CORS configuration per conventions.
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = { verifyEnv, corsOptions };
