import { ErrorResponse } from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  console.error(err.stack.red);

  // Mongoose errors
  if (err.name === "CastError") error = handleCastError(error);
  if (err.code === 11000) error = handleDuplicateError(error);
  if (err.name === "ValidationError") error = handleValidationError(error);

  // JWT errors
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

// Error handlers
const handleCastError = (err) =>
  new ErrorResponse(`Invalid ${err.path}: ${err.value}`, 400);
const handleDuplicateError = () =>
  new ErrorResponse("Duplicate field value", 400);
const handleValidationError = (err) =>
  new ErrorResponse(
    Object.values(err.errors)
      .map((e) => e.message)
      .join(", "),
    400
  );
const handleJWTError = () => new ErrorResponse("Invalid token", 401);
const handleJWTExpiredError = () => new ErrorResponse("Token expired", 401);
