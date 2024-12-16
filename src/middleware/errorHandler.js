const errorHandler = (err, req, res, next) => {
  // Set the status code. If the error doesn't have a status, default to 500.
  const statusCode = err.status || 500;

  // Create an error message. If the error doesn't have a message, provide a default one.
  const message =
    err.message ||
    "An error occurred on the server, please double-check your request!";

  // If it's a specific error, such as a validation error, you can dive deeper into the error details.
  // This helps to handle validation errors differently from server errors.
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed, please check your input.",
      errors: err.errors, // For example, an array of specific validation errors
    });
  }

  // Return the error code and message, but ensure the error stack is only visible in the development environment.
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      message,
      stack: err.stack, // Only visible in the development environment
    });
  }

  // In production, only return the message without the stack trace for better security.
  res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
