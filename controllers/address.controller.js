import httpStatus from "http-status";
import { addressService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const QueryAddress = catchAsync(async (req, res) => {
    const filters = pick(req.query, ["name"]);
    const options = pick(req.query, ["limit", "page", "sortBy"]);
    const address = await addressService.QueryAddress(filters, options);

    res.status(httpStatus.OK).send({meta: httpStatus.OK, ...address});
});

const CreateAddress = catchAsync(async (req, res) => {
    const address = await addressService.CreateAddress(req.body);

    res.status(httpStatus.CREATED).send({meta: httpStatus.CREATED, data: address});
});

const GetAddress = catchAsync(async (req, res) => {
    const address = await addressService.GetAddressById(req.params.addressId);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: address });
});

const UpdateAddress = catchAsync(async (req, res) => {
    const address = await addressService.UpdateAddress(req.params.addressId, req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: address });
});

const DeleteAddress = catchAsync(async (req ,res) => {
    const address = await addressService.DeleteAddress(req.params.addressId);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: address });
});

export default {
    QueryAddress,
    GetAddress,
    CreateAddress,
    DeleteAddress,
    UpdateAddress,
}