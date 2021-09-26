import httpStatus from "http-status";
import { Category } from "../models"
import ApiError from "../utils/ApiError";

/**
 * 
 * @param {Object} categoryBody - Category Object
 * @returns {Promise<Category>}
 */
const CreateCategory = async (categoryBody) => {
    if (await Category.isNameTaken(categoryBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already existed');
    }

    return Category.create(categoryBody);
};

/**
 * 
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryCategories = async (query, options) => {
    const filter = { name: { $regex: new RegExp(query.name), $options: "i" }, isActive: query.isActive || true };
    const categories = await Category.paginate(filter, options);

    return categories;
};

/**
 * 
 * @param {ObjectId} categoryId - Category ObjectId
 * @returns {Promise<Category>}
 */
const GetCategoryById = async (categoryId) => {
    return Category.findById(categoryId);
};

/**
 * 
 * @param {ObjectId} categoryId - Category ObjectId
 * @param {Object} categoryBody - Category Object
 * @returns {Promise<Category>}
 */
const UpdateCategory = async (categoryId, categoryBody) => {
    let category = await GetCategoryById(categoryId);

    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }

    Object.assign(category, categoryBody);
    await category.save();

    return category;
};

/**
 * 
 * @param {ObjectId} categoryId - Category ObjectId
 * @returns {Promise<Category>}
 */
const DeleteCategoryById = async (categoryId) => {
    const category = await GetCategoryById(categoryId);

    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }

    category.isActive = false;
    await category.save();
    return category;
};

export default {
    CreateCategory,
    QueryCategories,
    GetCategoryById,
    UpdateCategory,
    DeleteCategoryById,
}