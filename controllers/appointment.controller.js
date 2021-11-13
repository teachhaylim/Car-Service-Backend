import httpStatus from "http-status";
import { appointmentService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateAppointment = catchAsync(async (req, res) => {
    const appointment = await appointmentService.CreateAppointment(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: appointment });
});

const QueryAppointments = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["userId", "sellCompany", "bd", "ed"]);
    const options = pick(req.query, ["limit", "sortBy", "page"]);

    if (filter.bd && filter.ed) filter.createdAt = { $gte: new Date(filter.bd), $lte: new Date(filter.ed) };

    const appointment = await appointmentService.QueryAppointments(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...appointment });
});

const GetAppointment = catchAsync(async (req, res) => {
    const appointment = await appointmentService.GetAppointmentById(req.params.appointmentId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: appointment });
});

const UpdateAppointment = catchAsync(async (req, res) => {
    const appointment = await appointmentService.UpdateAppointment(req.params.appointmentId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: appointment });
});

const DeleteAppointment = catchAsync(async (req, res) => {
    const appointment = await appointmentService.DeleteAppointment(req.params.appointmentId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: appointment });
});

export default {
    CreateAppointment,
    QueryAppointments,
    GetAppointment,
    UpdateAppointment,
    DeleteAppointment,
}