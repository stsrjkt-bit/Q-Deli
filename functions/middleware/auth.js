const admin = require('firebase-admin');

/**
 * Firebase Auth verification middleware.
 * Requires Authorization: Bearer <token> header.
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Unauthorized', message: 'Missing token' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[AUTH ERROR]', error && error.message);
    return res.status(401).json({ success: false, error: 'Unauthorized', message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
