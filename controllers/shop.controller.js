import httpStatus from "http-status";
import { shopService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateShop = catchAsync(async (req, res) => {
    const shop = await shopService.createShop(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: shop });
});

const QueryShops = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["name"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const users = await shopService.queryShops(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...users });
});

const GetShop = catchAsync(async (req, res) => {
    const shop = await shopService.getShopById(req.params.shopId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

const UpdateShop = catchAsync(async (req, res) => {
    const shop = await shopService.updateShop(req.params.shopId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

const DeleteShop = catchAsync(async (req, res) => {
    const shop = await shopService.deleteShop(req.params.shopId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

export default {
    CreateShop,
    QueryShops,
    GetShop,
    UpdateShop,
    DeleteShop,
}