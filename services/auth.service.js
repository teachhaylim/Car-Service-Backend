import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import userService from "./user.service"

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);

    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }

    return user;
};

export default {
    loginWithEmailAndPassword,
}