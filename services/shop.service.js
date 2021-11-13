import httpStatus from "http-status";
import { addressService } from ".";
import { Shop } from "../models";
import ApiError from "../utils/ApiError";

/**
 * 
 * @param {Object} shopBody 
 * @returns {Promise<Shop>}
 */
const CreateShop = async (shopBody) => {
    const address = await addressService.CreateAddress(shopBody.address);

    shopBody.address = address._id;

    const shop = await Shop.create(shopBody);

    return shop;
};

/**
 * Query for shops
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryShops = async (filters, options) => {
    const shops = await Shop.paginate(filters, options);

    return shops;
};

/**
 * 
 * @param {ObjectId} shopId 
 * @returns {Promise<Shop>}
 */
const GetShopById = async (shopId) => {
    const shop = await Shop.findById(shopId);

    if (!shop) throw new ApiError(httpStatus.NOT_FOUND, "Shop not found");

    return shop;
};

/**
 * 
 * @param {ObjectId} shopId 
 * @param {Object} shopBody 
 * @returns {Promise<Shop>}
 */
const UpdateShop = async (shopId, shopBody) => {
    let dbAddress = await addressService.GetAddressById(shopBody.address.id);
    let shop = await GetShopById(shopId);
    const obj = {
        id: dbAddress._id,
        house: dbAddress.house,
        street: dbAddress.street,
        state: dbAddress.state,
        city: dbAddress.city,
        house: dbAddress.house,
        country: dbAddress.country,
        zipCode: dbAddress.zipCode,
    }

    if (JSON.stringify(obj) !== JSON.stringify(shopBody.address)) {
        Object.assign(dbAddress, JSON.parse(JSON.stringify(shopBody.address)));
        await dbAddress.save();
        shopBody.address = dbAddress._id;
    }

    Object.assign(shop, JSON.parse(JSON.stringify(shopBody)));
    await shop.save();

    return shop;
};

/**
 * 
 * @param {ObjectId} shopId 
 * @returns {Promise<Shop>}
 */
const DeleteShop = async (shopId) => {
    const shop = await GetShopById(shopId);

    shop.isActive = false;
    await shop.save();

    return shop;
};

export default {
    CreateShop,
    QueryShops,
    GetShopById,
    UpdateShop,
    DeleteShop,
}