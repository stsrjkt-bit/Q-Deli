/**
 * Express error handling middleware.
 * Formats errors to standardized API response shape.
 */
module.exports = function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[ERROR]', err && (err.stack || err.message || err));

  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal server error';

  res.status(status).json({
    success: false,
    error: status === 401 ? 'Unauthorized' : status === 400 ? 'Validation failed' : 'Internal server error',
    message
  });
};
