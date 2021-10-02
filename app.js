import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import router, { generalRouter } from "./routes";
import config from "./config/config";
import { authLimiter, publicLimiter } from "./middleware/limiter";
import morgan from "./config/morgan";
import { errorConverter, errorHandler } from './middleware/error';
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";

/**
 * Initialize Express App
 */
const app = express();

// configuration
app.use(cors());
app.use(helmet());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());

// Set authentication limiter on production
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
    app.use("/api/v1/", publicLimiter);
}

//Log incoming requests
if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use("/api/v1", router);
app.use("/", generalRouter);

// for setting up the project testing route
app.get('/', (_, res) => {
    res.send('Hello World!')
});

app.use(function (req, res, next) {
    res.status(404);
    throw new ApiError(httpStatus.NOT_FOUND, `${req.originalUrl} not found`);
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle any unknown requested routes back to client
app.use(errorHandler);

export default app;