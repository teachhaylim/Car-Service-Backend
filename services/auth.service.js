import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import userService from "./user.service"

/**
 * Login with Email and Password
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    const user = await userService.GetUserByEmail(email);

    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }

    return user;
};

const changePassword = async (userId, newPassword) => {
    const user = await userService.GetUserById(userId);

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    user.address = user?.address;
    user.sellCompany = user.sellCompany?.id;
    user.password = newPassword;
    user.save();

    return user;
};

export default {
    loginWithEmailAndPassword,
    changePassword,
}