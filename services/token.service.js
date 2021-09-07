import moment from "moment";
import { config } from "../config";
import jwt from "jsonwebtoken";

/**
 * Generate Token
 * @param {ObjectId} userId 
 * @param {Date} expire 
 * @param {String} secret 
 * @returns {Object} 
 */
const GenerateToken = (userId, expire = moment().add(config.jwt.expirationDays, "days").unix(), secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expire,
    };

    return jwt.sign(payload, secret);
};

/**
 * Verify Token
 * @param {String} token 
 * @returns {Promise<boolean>}
 */
const VerifyToken = async (token) => {
    return jwt.verify(token, config.jwt.secret);
};

export default {
    GenerateToken,
    VerifyToken
};