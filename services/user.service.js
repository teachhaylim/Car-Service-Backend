import httpStatus from "http-status";
import { cloneDeep } from "lodash";
import { User } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise} Promise<User>
 */
const createUser = async (userBody) => {
    return User.create(userBody);
};

/**
 * Get User by ID
 * @param {ObjectId} id 
 * @returns {Promise<User>} Promise<User>
 */
const getUserById = async (id) => {
    return User.findById(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({ email: email });
}

//TODO query based on fliter and option
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
    const users = await User.find();

    return users;
}

const updateUser = async (userId, userBody) => {
    let user = await getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    console.log(userBody)

    user = await user.findByIdAndUpdate(userId, { $set: JSON.parse(JSON.stringify(userBody)) });

    console.log(user);

    return user;
}

/**
 * Delete User by ID
 * @param {ObjectId} userId 
 * @returns {Promise<User>} Promise<User>
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
    getUserByEmail,
    deleteUserById,
    queryUsers,
    updateUser
}