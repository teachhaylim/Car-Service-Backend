import httpStatus from "http-status";
import { serviceService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateService = catchAsync(async (req, res) => {
    const service = await serviceService.CreateService(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: service });
});

const QueryServices = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["name", "sellCompany", "price"]);
    const options = pick(req.params, ["limit", "page", "sortBy"]);
    const service = await serviceService.QueryServices(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...service });
});

const GetService = catchAsync(async (req, res) => {
    const service = await serviceService.GetServiceById(req.params.serviceId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: service });
});

const UpdateService = catchAsync(async (req, res) => {
    const service = await serviceService.UpdateService(req.params.serviceId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: service });
});

const DeleteService = catchAsync(async (req, res) => {
    const service = await serviceService.DeleteService(req.params.serviceId)

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: service });
});

export default {
    CreateService,
    QueryServices,
    GetService,
    UpdateService,
    DeleteService,
}