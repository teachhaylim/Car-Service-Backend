import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

if (config.env === "test") {
    mongoose.set("debug", true);
}

/**
 * * Connect to MongoDB
 * 
 * @return {object} MongoDB connection
 * @public
 */
export default function () {
    return mongoose.connect(config.mongoose.url, config.mongoose.options)
        .then(() => {
            logger.info(`MongoDB successfully connected`);
        })
        .catch(err => {
            throw new Error(err);
        })
}