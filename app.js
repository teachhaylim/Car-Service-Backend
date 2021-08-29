import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import xss from "xss-clean";
import httpStatus from "http-status";
import mongoSanitize from "express-mongo-sanitize";

import ApiError from "./utils/ApiError";
import router from "./routes";
import { logRequest } from "./utils/generalFuncs";
import { config } from "dotenv";

import logger from "./config/logger";
import { authLimiter, publicLimiter } from "./middlewares/limiter";
// import morgan from "morgan";

/**
 * @public Initialize Express App
 */
const app = express();

// configuration
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
// app.use(morgan());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use("/", publicLimiter);

//TODO JWT Authentication with Passport, Morgan

// Set authentication limiter on production
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

// Log incoming requests to request.log file
app.use((req, _, next) => {
    logRequest(req);
    next();
});

// app.use("/api/v1", router);

// for setting up the project testing route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Handle any unknown requested routes back to client
app.use((req, res, next) => {
    const message = `Route ${req.url} not found`;

    logger.error(message);

    next(new ApiError(httpStatus.NOT_FOUND, message));
});

export default app;