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
const generateToken = (userId, expire = moment().add(2, "minutes").unix(), secret = config.jwt.secret) => {
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
const verifyToken = async (token) => {
    return jwt.verify(token, config.jwt.secret);
};

export default {
    generateToken,
    verifyToken
};