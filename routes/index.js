import express from "express";
import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import shopRoute from "./shop.route";
import userRoute from "./user.route";
import rateRoute from "./rate.route";
import serviceRoute from "./service.route";
import appointmentRoute from "./appointment.route";
import uploadRoute from "./upload.route";
import addressRoute from "./address.route";
import statsRoute from "./stats.route";

const router = express.Router();
export const generalRouter = express.Router();

const testRouter = express.Router();

testRouter.post("/", (req, res) => {
    console.log(req.body);

    res.status(200).send({ meta: 200, data: req.body });
});

const apiRoutes = [
    {
        path: "/test",
        route: testRouter,
    },
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
        path: "/address",
        route: addressRoute,
    },
    {
        path: "/stats",
        route: statsRoute,
    },
];

const generalRoute = [
    {
        path: "/file",
        route: uploadRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
];

apiRoutes.forEach(route => {
    router.use(route.path, route.route);
});

generalRoute.forEach(route => {
    generalRouter.use(route.path, route.route);
});

export default router;