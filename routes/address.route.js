import express from "express";
import addressController from "../controllers/address.controller";

const addressRoute = express.Router();

addressRoute.route("/")
    .get(addressController.QueryAddress)
    .post(addressController.CreateAddress);

addressRoute.route("/:addressId")
    .get(addressController.GetAddress)
    .patch(addressController.UpdateAddress)
    .delete(addressController.DeleteAddress);

export default addressRoute;