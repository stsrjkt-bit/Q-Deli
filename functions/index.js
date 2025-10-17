require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

const { corsOptions, verifyEnv } = require('./config');
const authRouter = require('./routes/auth');
const teachRouter = require('./routes/teach');
const gradeRouter = require('./routes/grade');
const mistakeRouter = require('./routes/mistake');
const flashcardRouter = require('./routes/flashcard');
const videoRouter = require('./routes/video');
const audioRouter = require('./routes/audio');
const testRouter = require('./routes/test');
const errorHandler = require('./middleware/errorHandler');

verifyEnv();

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cors(corsOptions));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

// Mount routers under /api
app.use('/api/auth', authRouter);
app.use('/api', teachRouter);
app.use('/api', gradeRouter);
app.use('/api', mistakeRouter);
app.use('/api', flashcardRouter);
app.use('/api', videoRouter);
app.use('/api', audioRouter);
app.use('/api', testRouter);

// Error handler (must be last)
app.use(errorHandler);

// Export express app for testing
module.exports = app;

// Firebase Function export
exports.api = functions.https.onRequest(app);
