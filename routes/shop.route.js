import express from "express";
import shopController from "../controllers/shop.controller";
import { auth, validate } from "../middlewares";
import { shopValidation } from "../validations";

const shopRoute = express.Router();

shopRoute.route("/")
    .get(auth, validate(shopValidation.queryShops), shopController.QueryShops)
    .post(auth, validate(shopValidation.createShop), shopController.CreateShop);

shopRoute.route("/:shopId")
    .get(auth, validate(shopValidation.getShop), shopController.GetShop)
    .patch(auth, validate(shopValidation.updateShop), shopController.UpdateShop)
    .delete(auth, validate(shopValidation.deleteShop), shopController.DeleteShop);

export default shopRoute;