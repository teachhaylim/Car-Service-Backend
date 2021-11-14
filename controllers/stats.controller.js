import httpStatus from "http-status";
import { statsService } from "../services";
import catchAsync from "../utils/catchAsync";

const TotalSale = catchAsync(async (req, res) => {
    const filters = {
        sellCompany: "617222fe0065218fc409ccdc",
        // isActive: true,
    };
    const options = {};
    const data = {
        totalAppointments: await statsService.getTotalAppointment(filters, options),
        totalIncome: await statsService.getTotalIncome(filters, options),
        countOfAppointedServices: await statsService.getCountOfAppointedServices(filters, options),
        pendingAppointments: await statsService.getPendingAppointments(filters, options),
        canceledAppointments: await statsService.getCanceledAppointments(filters, options),
        completedAppointments: await statsService.getCompletedAppointments(filters, options),
        numberOfServicesOffered: await statsService.getNumberOfServicesOffered(filters, options),
        numberOfServicesByUser: await statsService.getNumberOfServicesByUser(filters, options),
    };

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data });
});

export default {
    TotalSale,
};