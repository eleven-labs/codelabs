/**
 * Catch 404 and forward to error handler
 */
export default (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}
