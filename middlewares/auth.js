import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { tokenService, userService } from "../services";

const auth = async (req, _, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== "undefined") {
            const verify = await tokenService.verifyToken(bearerHeader);
            const user = await userService.getUserById(verify.sub);

            req.user = user;

            next();
        }
        else {
            next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
        }
    }
    catch {
        next(new ApiError(httpStatus.UNAUTHORIZED, "token expired"));
    }
}

export default auth;