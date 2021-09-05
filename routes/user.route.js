import express from "express";
import { userController } from "../controllers";
import { auth, validate } from "../middlewares";
import { userValidation } from "../validations";

const userRouter = express.Router();

userRouter.route("/")
    .get(auth, validate(userValidation.getUsers), userController.GetUsers)
    .post(auth, validate(userValidation.createUser), userController.CreateUser);

userRouter.route("/:userId")
    .get(auth, validate(userValidation.getUser), userController.GetUser)
    .patch(auth, validate(userValidation.updateUser), userController.UpdateUser)
    .delete(auth, validate(userValidation.deleteUser), userController.DeleteUser);

export default userRouter;