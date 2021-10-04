import Joi from "joi";
import { customValidation } from ".";

const createService = {
    body: Joi.object().keys({
        id: Joi.string().custom(customValidation.objectId).allow(""),
        name: Joi.string().required(),
        price: Joi.number().optional().default(0),
        remark: Joi.string().allow(""),
        sellCompany: Joi.string().custom(customValidation.objectId).allow(""),
        isActive: Joi.bool(),
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