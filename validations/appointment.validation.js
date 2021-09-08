import Joi from "joi";
import { customValidation } from ".";

const createAppointment = {
    body: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId).required(),
        sellCompany: Joi.string().custom(customValidation.objectId).required(),
        services: Joi.array().items(Joi.string().custom(customValidation.objectId)).required(),
        totalAmount: Joi.number().min(0).required(),
        status: Joi.array(),
    }),
};

const queryAppointments = {
    query: Joi.object().keys({
        userId: Joi.string(),
        sellCompany: Joi.string(),
        totalAmount: Joi.number(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        sortBy: Joi.string(),
    }),
};

const getAppointment = {
    params: Joi.object().keys({
        appointmentId: Joi.string().custom(customValidation.objectId).required(),
    }),
};

const updateAppointment = {
    ...getAppointment,
    ...createAppointment,
};

const deleteAppointment = {
    ...getAppointment,
};

export default {
    createAppointment,
    queryAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
}