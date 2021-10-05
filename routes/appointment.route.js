import express from "express";
import { appointmentController } from "../controllers";
import { auth, validate } from "../middleware";
import { appointmentValidation } from "../validations";

const appointmentRoute = express.Router();

appointmentRoute.route("/")
    .get(auth, validate(appointmentValidation.queryAppointments), appointmentController.QueryAppointments)
    // .post(auth, validate(appointmentValidation.createAppointment), appointmentController.CreateAppointment);
    .post(auth, appointmentController.CreateAppointment);

appointmentRoute.route("/:appointmentId")
    .get(auth, validate(appointmentValidation.getAppointment), appointmentController.GetAppointment)
    .patch(auth, validate(appointmentValidation.updateAppointment), appointmentController.UpdateAppointment)
    .delete(auth, validate(appointmentValidation.deleteAppointment), appointmentController.DeleteAppointment);

export default appointmentRoute;