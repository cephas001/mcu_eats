// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.log(err);
  res.status(status).json({
    type: err.type || "InternalServerError",
    message: err.message || "An unexpected error occurred",
    ...(err.inputName && { inputName: err.inputName }),
    ...(err.errorList && { errorList: err.errorList }),
  });
}
