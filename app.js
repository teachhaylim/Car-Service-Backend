import express from "express";
import cors from "cors";
import helmet from "helmet";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

//TODO JWT Authentication with Passport
//TODO AuthLimiter

app.use("/api/v1");
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

export default app;