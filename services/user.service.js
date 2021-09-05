import httpStatus from "http-status";
import { User } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise}
 */
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};

/**
 * Get User by ID
 * @param {ObjectId} id 
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
    return User.findById(id);
};

/**
 * Get User by email
 * @param {string} email 
 * @returns 
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email: email });
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
    //TODO populate
    const users = await User.paginate(filter, options);

    return users;
}

/**
 * Update User by ID
 * @param {ObjectId} userId 
 * @param {Object} userBody 
 * @returns 
 */
const updateUser = async (userId, userBody) => {
    let user = await getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    //FIXME nested object/array bug
    Object.assign(user, userBody);
    await user.save();

    return user;
}

/**
 * Delete User by ID
 * @param {ObjectId} userId 
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
    const user = await getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    //FIXME set is_active = false instead of delete reocrd
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