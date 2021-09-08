import httpStatus from "http-status";
import { Service } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create new service record
 * @param {Object} serviceBody 
 * @returns {Promise<Service>}
 */
const CreateService = async (serviceBody) => {
    return Service.create(serviceBody);
};

/**
 * Query for service
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryServices = async (filter, options) => {
    return await Service.paginate(filter, options);
};

/**
 * Get service by id
 * @param {ObjectId} serviceId 
 * @returns {Promise<Service>}
 */
const GetServiceById = async (serviceId) => {
    return await Service.findById(serviceId);
};

/**
 * Update service by id
 * @param {ObjectId} serviceId 
 * @param {Object} serviceBody 
 * @returns {Promise<Service>}
 */
const UpdateService = async (serviceId, serviceBody) => {
    const service = await GetServiceById(serviceId);

    if (!service) {
        throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
    }

    Object.assign(service, JSON.parse(JSON.stringify(serviceBody)));
    await service.save();

    return service;
};

/**
 * Delete service
 * @param {ObjectId} serviceId 
 * @returns {Promise<Service>}
 */
const DeleteService = async (serviceId) => {
    const service = await GetServiceById(serviceId);

    if (!service) {
        throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
    }

    service.isActive = false;
    await service.save();

    return service;
};

export default {
    CreateService,
    QueryServices,
    GetServiceById,
    UpdateService,
    DeleteService,
}