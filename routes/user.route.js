import express from "express";
import httpStatus from "http-status";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/")
    .get(userController.GetUsers)
    .post(userController.CreateUser);

userRouter.route("/:userId")
    .get(userController.GetUser)
    .patch(userController.UpdateUser)
    .delete(userController.DeleteUser);

export default userRouter;