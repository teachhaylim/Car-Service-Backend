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
        password: Joi.string().custom(customValidation.password).required(),
        isActive: Joi.boolean().valid(true, false),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        id: Joi.string().custom(customValidation.objectId),
    }),
};

const getUsers = {
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
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId).required(),
    }),
    ...createUser,
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId).required(),
    })
};

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
}