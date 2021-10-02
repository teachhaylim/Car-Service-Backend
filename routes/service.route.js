import express from "express";
import { serviceController } from "../controllers";
import { auth, validate } from "../middleware";
import { serviceValidation } from "../validations";

const serviceRoute = express.Router();

serviceRoute.route("/")
    .get(auth, validate(serviceValidation.queryServices), serviceController.QueryServices)
    .post(auth, validate(serviceValidation.createService), serviceController.CreateService);

serviceRoute.route("/:serviceId")
    .get(auth, validate(serviceValidation.getService), serviceController.GetService)
    .patch(auth, validate(serviceValidation.updateService), serviceController.UpdateService)
    .delete(auth, validate(serviceValidation.deleteService), serviceController.DeleteService);

export default serviceRoute;