import httpStatus from "http-status";
import { Address, Appointment } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create new address
 * @param {Object} addressBody 
 * @returns 
 */
const CreateAddress = async (addressBody) => {
    return await Address.create(addressBody);
};

/**
 * Query for address
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryAddress = async(filter, options) => {
    return await Address.paginate(filter, options);
};

/**
 * Get address by Id
 * @param {ObjectId} addressId 
 * @returns 
 */
const GetAddressById = async(addressId) => {
    const address = await Appointment.findById(addressId);

    if(!address) throw new ApiError(httpStatus.NOT_FOUND, "Address not found");

    return address;
};

/**
 * Update existing address
 * @param {ObjectId} addressId 
 * @param {Object} addressBody 
 * @returns 
 */
const UpdateAddress = async(addressId, addressBody) => {
    const address = await GetAddressById(addressId);

    Object.assign(address, JSON.parse(JSON.stringify(address)));
    address.save();

    return address;
};

/**
 * Inactive existing address by Id
 * @param {ObjectId} addressId 
 * @returns 
 */
const DeleteAddress = async(addressId) => {
    const address = await GetAddressById(addressId);

    address.isActive = false;
    address.save();

    return address;
};

export default {
    CreateAddress,
    QueryAddress,
    GetAddressById,
    UpdateAddress,
    DeleteAddress,
};