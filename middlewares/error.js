import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../config/config';
import ApiError from '../utils/ApiError';

/**
 * 
 * @param {Error} err 
 * @param {Request} _ 
 * @param {Response} __ 
 * @param {Next} next 
 */
export const errorConverter = (err, _, __, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];

        error = new ApiError(statusCode, message, false, err.stack);
    }

    next(error);
};

/**
 * 
 * @param {Error} err 
 * @param {Request} _ 
 * @param {Response} res 
 * @param {Next} __ 
 */
export const errorHandler = (err, _, res, __) => {
    let { statusCode, message } = err;

    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        // ...(config.env === 'development' && { stack: err.stack }),
    };

    res.status(statusCode).send(response);
};

export default {
    errorConverter,
    errorHandler,
}
