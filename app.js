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
import authLimiter from "./middlewares/authLimiter";

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

//TODO JWT Authentication with Passport, Morgan

if (config.env === "production") {
    app.use("/v1/auth", authLimiter);
}

app.use((req, res, next) => {
    // next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
    logRequest(req);
    next();
});

// app.use("/api/v1", router);

// for setting up the project testing route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app;