import express from "express";
import userRouter from "./user.route";

const router = express.Router();

const adminRoute = [
    {
        path: "/user",
        route: userRouter,
    },
];

adminRoute.forEach(route => {
    router.use(route.path, route.route);
});

export default router;