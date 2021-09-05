import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

if (config.env === "test") {
    mongoose.set("debug", true);
}

/**
 * Initialize MongoDB connection
 * @returns {object}
 */
export default function () {
    return mongoose.connect(config.mongoose.url, config.mongoose.options)
        .then(() => {
            logger.info(`MongoDB successfully connected`);
        })
        .catch(err => {
            logger.error(`MongoDB failed to connect - ${err}`);
            throw new Error(err);
        })
}