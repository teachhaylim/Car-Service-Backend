import logger from "./logger";
import config from "./config";
import morgan from "morgan";

morgan.token('message', (_, res) => res?.locals?.errorMessage || 'route not found');
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

/**
 * Handle Log Request Success
 */
const successHandler = morgan(successResponseFormat, {
    skip: (_, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.request(`${message.trim()}`) },
});

/**
 * Handle Log Request Error
 */
const errorHandler = morgan(errorResponseFormat, {
    skip: (_, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(`${message.trim()}`) },
});

export default {
    successHandler,
    errorHandler
}