import httpStatus from "http-status";
import { rateService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateRate = catchAsync(async (req, res) => {
    const rate = await rateService.CreateRate(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: rate });
});

const QueryRates = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["level", "user", "sellCompany"]);
    const options = pick(req.query, ["limit", "sortBy", "page"]);
    const rates = await rateService.QueryRates(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...rates });
});

const GetRate = catchAsync(async (req, res) => {
    const rate = await rateService.GetRateById(req.params.rateId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: rate });
});

const UpdateRate = catchAsync(async (req, res) => {
    const rate = await rateService.UpdateRate(req.params.rateId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: rate });
});

const DeleteRate = catchAsync(async (req, res) => {
    const rate = await rateService.DeleteRate(req.params.rateId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: rate });
});

export default {
    CreateRate,
    QueryRates,
    GetRate,
    UpdateRate,
    DeleteRate,
}