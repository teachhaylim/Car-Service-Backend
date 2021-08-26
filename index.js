import mongoose from "mongoose";
import app from "./app";
import logger from "./config/logger";

let server;

// mongoose.connect();

server = app.listen(5000, () => {
    logger.info("Listening on port 5000");
})

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server Close");
            process.exit(1);
        })
    }
    else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
})