import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my Bookings API!");
});

// Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(logMiddleware);

// Resource routes
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

// Login
app.use("/login", loginRouter);

// Trace errors
// The error handler must be registered before any other error middleware and after all controllers/services
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
