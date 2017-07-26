/**
 * error handler
 */
export default env => (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    // for production mode, no stacktraces leaked to user.
    error: env === 'development' ? err : {},
    status: err.status,
  });
};