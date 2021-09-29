import httpStatus from "http-status";
import { Appointment } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create new appointment
 * @param {Object} appointmentBody 
 * @returns {Promise<Appointment>}
 */
const CreateAppointment = async (appointmentBody) => {
    return await Appointment.create(appointmentBody);
};

/**
 * Query for apppointment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const QueryAppointments = async (filter, options) => {
    return await Appointment.paginate(filter, options);
};

/**
 * Get appointment by id
 * @param {ObjectId} appointmentId 
 * @returns {Promise<Appointment>}
 */
const GetAppointmentById = async (appointmentId) => {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment not found");

    return appointment;
};

/**
 * Update appointment
 * @param {ObjectId} appointmentId 
 * @param {Object} appointmentBody 
 * @returns {Promise<Appointment>}
 */
const UpdateAppointment = async (appointmentId, appointmentBody) => {
    const appointment = await GetAppointmentById(appointmentId);

    Object.assign(appointment, JSON.parse(JSON.stringify(appointmentBody)));
    await appointment.save();

    return appointment;
};

/**
 * Delete appointment
 * @param {ObjectId} appointmentId 
 * @returns {Promise<Appointment>}
 */
const DeleteAppointment = async (appointmentId) => {
    const appointment = await GetAppointmentById(appointmentId);

    appointment.isActive = false;
    await appointment.save();

    return appointment;
};

export default {
    CreateAppointment,
    QueryAppointments,
    GetAppointmentById,
    UpdateAppointment,
    DeleteAppointment,
}