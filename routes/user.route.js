import express from "express";
import { userController } from "../controllers";
import { auth } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/")
    .get(auth, userController.GetUsers)
    .post(userController.CreateUser);

userRouter.route("/:userId")
    .get(userController.GetUser)
    .patch(userController.UpdateUser)
    .delete(userController.DeleteUser);

export default userRouter;