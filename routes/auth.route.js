import express from "express";
import { authController } from "../controllers";

const authRouter = express.Router();

//TODO register/forgetpassword
authRouter.post("/register");
authRouter.post("/login", authController.Login);
authRouter.post("/forgetpassword");

export default authRouter;