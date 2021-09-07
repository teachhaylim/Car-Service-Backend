import express from "express";
import { categoryController } from "../controllers";
import { auth, validate } from "../middlewares";
import { categoryValidation } from "../validations";

const categoryRoute = express.Router();

categoryRoute.route("/")
    .get(auth, validate(categoryValidation.queryCategories), categoryController.QueryCategories)
    .post(auth, validate(categoryValidation.createCategory), categoryController.CreateCategory);

categoryRoute.route("/:categoryId")
    .get(auth, validate(categoryValidation.getCategory), categoryController.GetCategory)
    .patch(auth, validate(categoryValidation.updateCategory), categoryController.UpdateCategory)
    .delete(auth, validate(categoryValidation.deleteCategory), categoryController.DeleteCategory);

export default categoryRoute;