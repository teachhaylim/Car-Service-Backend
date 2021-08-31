import moment from "moment";
import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import mongoose from "./config/mongoose";
import { LogCurrentTime } from "./utils/generalFuncs";

var server;

const unexpectedErrorHandler = (error) => {
    logger.error(error);

    if (server) {
        server.close(() => {
            logger.info(`${LogCurrentTime()} - Server Close`);
            process.exit(1);
        })
    }
    else {
        process.exit(1);
    }
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger.info(`${LogCurrentTime()} - SIGTERM received`);
    if (server) {
        server.close();
        process.exit(1);
    }
})

/**
 * @private Start server
 */
async function StartServer() {
    try {
        //TODO for the time being, no need to connect to db
        await mongoose();

        server = app.listen(config.port, () => {
            logger.info(`${LogCurrentTime()} - Listening on port ${config.port} (${config.env})`);
        })
    } catch (error) {
        logger.error(`${LogCurrentTime()} - Fail to start server: ${error}`);
        process.exit(-1);
    }
}

StartServer();