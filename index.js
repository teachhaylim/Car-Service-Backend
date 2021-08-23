import mongoose from "mongoose";

let server;

// mongoose.connect();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            //TODO logger;
            process.exit(1);
        })
    }
    else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = () => {
    //TODO logger;
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    //TODO logger;
    if (server) {
        server.close();
    }
})