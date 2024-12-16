import logger from "../utils/logger.js";

const logMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    // Wait until response is fully processed
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration} ms`
    );
  });

  next(); // Go to next middleware or route-handler
};

export default logMiddleware;
