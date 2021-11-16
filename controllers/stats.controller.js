import httpStatus from "http-status";
import { statsService } from "../services";
import catchAsync from "../utils/catchAsync";

const SaleDashboard = catchAsync(async (req, res) => {
    const filters = req.query;
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
        countOfDailyAppointments: await statsService.getCountOfDailyAppointments(filters, options),
    };

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data });
});

const AdminDashboard = catchAsync(async (req, res) => {
    const filters = req.query;
    const options = {};
    const data = {
        totalCategories: await statsService.getTotalCategories(filters, options),
        totalShops: await statsService.getTotalShops(filters, options),
        totalUsers: await statsService.getTotalUsers(filters, options),
        newlyRegisteredUsers: await statsService.getNewlyRegisteredUsers(filters, options),
        newlyRegisteredShops: await statsService.getNewlyRegisteredShops(filters, options),
    };

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data });
});

export default {
    SaleDashboard,
    AdminDashboard,
};