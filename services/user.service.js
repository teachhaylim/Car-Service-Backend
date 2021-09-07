import httpStatus from "http-status";
import { User } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create user
 * @param {Object} userBody - User Object
 * @returns {Promise<User>}
 */
const CreateUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};

/**
 * Get User by ID
 * @param {ObjectId} id - User ObjectId
 * @returns {Promise<User>}
 */
const GetUserById = async (id) => {
    return User.findById(id);
};

/**
 * Get User by email
 * @param {String} email - User email
 * @returns {Promise<String>}
 */
const GetUserByEmail = async (email) => {
    return User.findOne({ email: email });
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);

    return users;
}

/**
 * Update User by ID
 * @param {ObjectId} userId - User ObjectId
 * @param {Object} userBody - User Object
 * @returns 
 */
const UpdateUser = async (userId, userBody) => {
    let user = await GetUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    Object.assign(user, userBody);
    await user.save();

    return user;
}

/**
 * Delete User by ID
 * @param {ObjectId} userId - User ObjectId
 * @returns {Promise<User>}
 */
const DeleteUserById = async (userId) => {
    const user = await GetUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    user.isActive = false;
    await user.save();
    return user;
}

export default {
    CreateUser,
    GetUserById,
    GetUserByEmail,
    DeleteUserById,
    QueryUsers,
    UpdateUser
}