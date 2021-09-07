import Joi from "joi";
import { customValidation } from ".";

const createShop = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        logo: Joi.string(),
        categories: Joi.array().items(Joi.string().custom(customValidation.objectId).required()).required(),
        isActive: Joi.boolean().valid(true, false),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        id: Joi.string().optional().custom(customValidation.objectId),
    })
};

const getShop = {
    params: Joi.object().keys({
        shopId: Joi.string().custom(customValidation.objectId).required(),
    }),
};

const queryShops = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateShop = {
    params: Joi.object().keys({
        shopId: Joi.string().custom(customValidation.objectId).required(),
    }),
    ...createShop,
};

const deleteShop = {
    params: Joi.object().keys({
        shopId: Joi.string().custom(customValidation.objectId).required(),
    }),
};

export default {
    createShop,
    getShop,
    queryShops,
    updateShop,
    deleteShop,
}