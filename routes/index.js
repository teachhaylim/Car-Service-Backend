import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";

const router = express.Router();
export const authRouter = express.Router();

const apiroutes = [
    {
        path: "/user",
        route: userRoute,
    },
];

const authroutes = [
    {
        path: "/auth",
        route: authRoute,
    },
]

apiroutes.forEach(route => {
    router.use(route.path, route.route);
});

authroutes.forEach(route => {
    authRouter.use(route.path, route.route);
});

export default router;