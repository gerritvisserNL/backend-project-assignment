import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "info" : "error", // Logniveaus: 'info' in dev and 'error' in production
  format: winston.format.json(),
  defaultMeta: { service: "bookings-api" },
});

// In dev environment add console output with detailed log messages
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Displays log messages in a simple text format
    })
  );
} else {
  logger.add(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
}

export default logger;
