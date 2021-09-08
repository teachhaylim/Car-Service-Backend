import express from "express";
import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import shopRoute from "./shop.route";
import userRoute from "./user.route";
import rateRoute from "./rate.route";
import serviceRoute from "./service.route";
import appointmentRoute from "./appointment.route";

const router = express.Router();

const apiRoutes = [
    {
        path: "/user",
        route: userRoute,
    },
    {
        path: "/category",
        route: categoryRoute,
    },
    {
        path: "/shop",
        route: shopRoute,
    },
    {
        path: "/rate",
        route: rateRoute,
    },
    {
        path: "/service",
        route: serviceRoute,
    },
    {
        path: "/appointment",
        route: appointmentRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
];

apiRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;