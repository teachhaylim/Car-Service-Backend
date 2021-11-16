import httpStatus from "http-status";
import { shopService, userService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateShop = catchAsync(async (req, res) => {
    const shop = await shopService.CreateShop(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: shop });
});

const QueryShops = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["name", "categories"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const users = await shopService.QueryShops(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...users });
});

const GetShop = catchAsync(async (req, res) => {
    const shop = await shopService.GetShopById(req.params.shopId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

const GetShopInfo = catchAsync(async (req, res) => {
    const user = await userService.GetUserById(req.user._id);
    const shop = await shopService.GetShopById(user.sellCompany);

    res.status(httpStatus.OK).send({meta: httpStatus.OK, data: shop});
});

const UpdateShop = catchAsync(async (req, res) => {
    const shop = await shopService.UpdateShop(req.params.shopId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

const DeleteShop = catchAsync(async (req, res) => {
    const shop = await shopService.DeleteShop(req.params.shopId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: shop });
});

export default {
    CreateShop,
    QueryShops,
    GetShop,
    GetShopInfo,
    UpdateShop,
    DeleteShop,
}