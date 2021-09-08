import Joi from "joi";
import { customValidation } from ".";

const createService = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().optional().default(0),
        sellCompany: Joi.string().custom(customValidation.objectId).required(),
    }),
};

const queryServices = {
    query: Joi.object().keys({
        name: Joi.string(),
        sellCompany: Joi.string(),
        price: Joi.number(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        sortBy: Joi.string(),
    }),
};

const getService = {
    params: Joi.object().keys({
        serviceId: Joi.string().custom(customValidation.objectId).required(),
    }),
};

const updateService = {
    ...getService,
    ...createService,
};

const deleteService = {
    ...getService,
};

export default {
    createService,
    queryServices,
    getService,
    updateService,
    deleteService,
}