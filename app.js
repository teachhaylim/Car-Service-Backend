import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import router from "./routes";
import { config } from "dotenv";
import { authLimiter, publicLimiter } from "./middlewares/limiter";
import morgan from "./config/morgan";
import { errorConverter, errorHandler } from './middlewares/error';

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
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use("/", publicLimiter);

//TODO JWT Authentication with Passport, Morgan

// Set authentication limiter on production
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

//Log incoming requests
if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use("/api/v1", router);

// for setting up the project testing route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle any unknown requested routes back to client
app.use(errorHandler);

export default app;