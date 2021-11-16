import Joi from "joi";
import { customValidation } from ".";

const createUser = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required().max(10),
        profilePic: Joi.string(),
        type: Joi.string(),
        dob: Joi.date(),
        email: Joi.string().email().required(),
        // password: Joi.string().custom(customValidation.password).optional().allow(""),
        // isActive: Joi.boolean().valid(true, false).optional().allow(""),
        // createdAt: Joi.date().optional(),
        // updatedAt: Joi.date().optional(),
        // address: Joi.string().custom(customValidation.objectId).required(),
        // sellCompany: Joi.string().custom(customValidation.objectId).allow("", null),
        id: Joi.string().custom(customValidation.objectId),
    }),
};

const queryUsers = {
    query: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId).required(),
    })
};

const updateUser = {
    ...getUser,
    ...createUser,
};

const deleteUser = {
    ...getUser,
};

export default {
    createUser,
    getUser,
    queryUsers,
    updateUser,
    deleteUser,
}