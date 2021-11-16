import express from "express";
import { userController } from "../controllers";
import { auth, validate } from "../middleware";
import { userValidation } from "../validations";

const userRouter = express.Router();

userRouter.route("/")
    .get(auth, validate(userValidation.queryUsers), userController.GetUsers)
    .post(auth, userController.CreateUser);

userRouter.route("/info")
    .get(auth, userController.GetUserInfo);

userRouter.route("/:userId")
    .get(auth, validate(userValidation.getUser), userController.GetUser)
    .put(auth, userController.UpdateUser)
    .delete(auth, validate(userValidation.deleteUser), userController.DeleteUser);

export default userRouter;