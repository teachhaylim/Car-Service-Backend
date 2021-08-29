import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import mongoose from "./config/mongoose";

var server;

const unexpectedErrorHandler = (error) => {
    logger.error(error);

    if (server) {
        server.close(() => {
            logger.info("Server Close");
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
    logger.info('SIGTERM received');
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
        await mongoose();

        server = app.listen(config.port, () => {
            logger.info(`Listening on port ${config.port} (${config.env})`);
        })
    } catch (error) {
        logger.error(`Fail to start server: ${error}`);
        process.exit(-1);
    }
}

StartServer();