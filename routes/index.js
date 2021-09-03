import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = express.Router();

const adminRoute = [
    {
        path: "/user",
        route: userRouter,
    },
    {
        path: "/auth",
        route: authRouter,
    }
];

adminRoute.forEach(route => {
    router.use(route.path, route.route);
});

export default router;