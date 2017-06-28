module.exports = function errorHandler( err, req, res, next ) {
  console.error('error-handler-middleware.js threw an Error!', err.message);
  res.status(err.status || 500);
  res.json({ message: err.message, time: Date.now() });
};
