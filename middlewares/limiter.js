import rateLimit from "express-rate-limit";

/**
 * Authentication Limiter - limit maximum of 10 requests within 10 mintues
 */
export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    // skipSuccessfulRequests: true,
});

/**
 * Public Route Limiter - limit maximum of 50 requests within 15 mintues
 */
export const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
});

export default {
    authLimiter,
    publicLimiter,
};