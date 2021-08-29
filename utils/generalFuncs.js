import logger from "../config/logger";

/**
 * @public Log incoming requests to request.log file
 * @param request 
 */
export function logRequest(request) {
    // const message = `${request.method} -> from ${request.connection.remoteAddress} to ${request.headers.host} : Route -> ${request.url}`;
    const message = `${request.method} -> from ${request.connection.remoteAddress} : Route -> ${request.url}`;

    logger.request(message);
}
