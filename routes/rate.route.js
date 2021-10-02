import express from "express";
import { rateController } from "../controllers";
import { auth, validate } from "../middleware";
import { rateValidation } from "../validations";

const rateRoute = express.Router();

rateRoute.route("/")
    .get(auth, validate(rateValidation.queryRates), rateController.QueryRates)
    .post(auth, validate(rateValidation.createRate), rateController.CreateRate);

rateRoute.route("/:rateId")
    .get(auth, validate(rateValidation.getRate), rateController.GetRate)
    .patch(auth, validate(rateValidation.updateRate), rateController.UpdateRate)
    .delete(auth, validate(rateValidation.deleteRate), rateController.DeleteRate);

export default rateRoute;