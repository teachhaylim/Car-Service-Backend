import { User } from "../models";

/**
 * Create user
 * @param {Object} userBody
 * @return {Promise} Promise<User>
 */
const createUser = async (userBody) => {
    const temp = User.find();

    return new Promise((resolve, _) => {
        setTimeout(() => resolve(userBody), 5000);
    });
};

export default {
    createUser,
}