import httpStatus from "http-status";
import { Rate } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create new rate record
 * @param {Object} rateBody 
 * @returns {Promise<Rate>}
 */
const CreateRate = async (rateBody) => {
    return await Rate.create(rateBody);
};

/**
 * Query for rates
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryRates = async (filter, options) => {
    return await Rate.paginate(filter, options);
};

/**
 * Get rate by id
 * @param {ObejctId} rateId 
 * @returns {Promise<Rate>}
 */
const GetRateById = async (rateId) => {
    const rate = await Rate.findById(rateId);

    if (!rate) throw new ApiError(httpStatus.NOT_FOUND, "Rate not found");

    return rate;
};

/**
 * Update existing rate record
 * @param {ObjectId} rateId 
 * @param {Object} rateBody 
 * @returns {Promise<Rate>}
 */
const UpdateRate = async (rateId, rateBody) => {
    const rate = await GetRateById(rateId);

    Object.assign(rate, JSON.parse(JSON.stringify(rateBody)));
    await rate.save();

    return rate;
};

/**
 * Delete rate
 * @param {ObjectId} rateId 
 * @returns {Promise<Rate>}
 */
const DeleteRate = async (rateId) => {
    const rate = await GetRateById(rateId);

    await rate.remove();

    return rate;
};

export default {
    CreateRate,
    QueryRates,
    GetRateById,
    UpdateRate,
    DeleteRate,
}