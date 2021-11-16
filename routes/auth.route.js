import express from "express";
import { authController } from "../controllers";
import { auth } from "../middleware";

const authRouter = express.Router();

//TODO register
authRouter.post("/register");
authRouter.post("/login", authController.Login);
authRouter.post("/userlogin", authController.LoginUser);
authRouter.get("/info", auth, authController.LoggedInfo);
authRouter.post("/changepassword", auth, authController.ChangePassword);

export default authRouter;