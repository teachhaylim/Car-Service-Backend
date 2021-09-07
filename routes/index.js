import express from "express";
import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import shopRoute from "./shop.route";
import userRoute from "./user.route";

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
        path: "/auth",
        route: authRoute,
    },
];

apiRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;