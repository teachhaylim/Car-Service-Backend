import Joi from "joi";
import { customValidation } from ".";

const createShop = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        logo: Joi.string().allow(""),
        description: Joi.string().allow(""),
        categories: Joi.array().items(Joi.string().custom(customValidation.objectId).required()).required(),
        address: Joi.array().items().required(),
        // isActive: Joi.boolean().valid(true, false),
        // createdAt: Joi.date().allow(""),
        // updatedAt: Joi.date().allow(""),
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
    ...getShop,
    ...createShop,
};

const deleteShop = {
    ...getShop,
};

export default {
    createShop,
    getShop,
    queryShops,
    updateShop,
    deleteShop,
}