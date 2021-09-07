import Joi from "joi";
import { customValidation } from ".";

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        remark: Joi.string().allow(""),
        isActive: Joi.boolean().valid(true, false),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        id: Joi.string().custom(customValidation.objectId),
    })
};

const queryCategories = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(customValidation.objectId).required(),
    })
};

const updateCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(customValidation.objectId).required(),
    }),
    ...createCategory,
};

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(customValidation.objectId).required(),
    })
};

export default {
    createCategory,
    queryCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}