import Joi from "joi";
import { customValidation } from ".";

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(customValidation.password),
        name: Joi.string().required(),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
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
        userId: Joi.string().custom(customValidation.objectId),
    }),
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(customValidation.password),
        name: Joi.string().required(),
    }),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId),
    })
};

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
}