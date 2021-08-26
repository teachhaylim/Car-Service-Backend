import moment from "moment";
import winston from "winston";
import { createLogger, format, transports } from "winston";
import { addColors } from "winston/lib/winston/config";

const { combine, printf } = format;

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

/**
 * * Custom Log Levels
 * 
 * @return {object} Custom internal log levels and colors 
*/
const customLogLevels = {
    levels: {
        error: 0,
        warning: 1,
        debug: 2,
        request: 3,
        info: 4,
    },
    colors: {
        error: "red",
        warning: "yellow",
        debug: "purple",
        request: "blue",
        info: "green",
    },
};

addColors(customLogLevels.colors);

const logger = createLogger({
    levels: customLogLevels.levels,
    format: combine(
        enumerateErrorFormat(),
        // format.simple(),
        format.colorize(),
        printf(({ level, message }) => {
            const dateTime = moment().format("YYYY-MM-DD hh:mm:ss A");

            return `${dateTime} - ${level}: ${message}`;
        })
    ),
    transports: [
        // new transports.File({ filename: './logs/combined.log' }),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/warning.log', level: 'warning' }),
        new transports.File({ filename: './logs/debug.log', level: 'debug' }),
        new transports.File({ filename: './logs/request.log', level: 'request' }),
        new transports.File({ filename: './logs/system.log' }),
        new transports.Http({
            level: 'warn',
            format: winston.format.json()
        }),
        new transports.Console(),
    ],
});

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }

/**
 * * Log operation to its corresponding files
 * 
 * @return {object} Winston log object
 * @public
*/
export default logger;