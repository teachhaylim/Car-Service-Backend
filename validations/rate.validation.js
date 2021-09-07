import Joi from "joi";
import { customValidation } from ".";

const createRate = {
    body: Joi.object().keys({
        level: Joi.number().min(0).max(5).required(),
        user: Joi.string().custom(customValidation.objectId).required(),
        sellCompany: Joi.string().custom(customValidation.objectId).required(),
        remark: Joi.string().allow(""),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        id: Joi.string().custom(customValidation.objectId),
    })
};

const queryRates = {
    query: Joi.object().keys({
        level: Joi.string(),
        user: Joi.string(),
        sellCompany: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getRate = {
    params: Joi.object().keys({
        rateId: Joi.string().custom(customValidation.objectId).required(),
    })
};

const updateRate = {
    ...getRate,
    ...createRate,
};

const deleteRate = {

};

export default {
    createRate,
    queryRates,
    getRate,
    updateRate,
    deleteRate,
}