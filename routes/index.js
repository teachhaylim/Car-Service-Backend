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

const router = express.Router();
export const generalRouter = express.Router();

const testRouter = express.Router();

testRouter.route("/")
    .get((req, res) => {

    })
    .post((req, res) => {
        const data = req.body;

        console.log(data);

        res.status(200).send({ meta: 200, data});
    });

const apiRoutes = [
    {
        path: "/user",
        route: userRoute,
    },
    {
        path: "/test",
        route: testRouter,
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
    }
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