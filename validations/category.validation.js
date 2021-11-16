import Joi from "joi";
import { customValidation } from ".";

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        remark: Joi.string().allow(""),
        image: Joi.string().allow(""),
        // isActive: Joi.boolean().valid(true, false),
        // createdAt: Joi.date(),
        // updatedAt: Joi.date(),
        // id: Joi.string().custom(customValidation.objectId),
    })
};

const queryCategories = {
    query: Joi.object().keys({
        name: Joi.string().allow(""),
        sortBy: Joi.any(),
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
    ...getCategory,
    ...createCategory,
};

const deleteCategory = {
    ...getCategory,
};

export default {
    createCategory,
    queryCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}