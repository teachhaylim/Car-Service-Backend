import logger from "../config/logger";

export function logRequest(req) {
    // const message = `${req.method} -> from ${req.connection.remoteAddress} to ${req.headers.host} : Route -> ${req.url}`;
    const message = `${req.method} -> from ${req.connection.remoteAddress} : Route -> ${req.url}`;

    logger.request(message);
}
