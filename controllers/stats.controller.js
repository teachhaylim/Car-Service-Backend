import httpStatus from "http-status";
import { statsService } from "../services";
import catchAsync from "../utils/catchAsync";

const TotalIncomeWithPeriod = catchAsync(async (resq, res) => {
    const data = await statsService.GetTotalIncomeByPeriod();

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data });
});

export default {
    TotalIncomeWithPeriod,
};