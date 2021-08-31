import httpStatus from "http-status";
import { User } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create user
 * @param {Object} userBody
 * @return {Promise} Promise<User>
 */
const createUser = async (userBody) => {
    return User.create(userBody);
};

/**
 * Get User by ID
 * @param {ObjectId} id 
 * @return {Promise<User>} Promise<User>
 */
const getUserById = async (id) => {
    return User.findById(id);
};

const queryUsers = async () => {

}

/**
 * Delete User by ID
 * @param {ObjectId} userId 
 * @return {Promise<User>} Promise<User>
 */
const deleteUserById = async (userId) => {
    const user = await getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    await user.remove();
    return user;
}

export default {
    createUser,
    getUserById,
    deleteUserById,
}