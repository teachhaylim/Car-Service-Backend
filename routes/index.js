import express from "express";
import userRoute from "./user.route";

const router = express.Router();

const adminRoute = [
    {
        path: "/user",
        route: userRoute,
    },
];

// adminRoute.forEach(route => {
//     router.use(route.path, route.route);
// });

export default router;