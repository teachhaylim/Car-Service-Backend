import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { tokenService, userService } from "../services";
import moment from "moment";

const auth = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== "undefined") {
            const verify = await tokenService.VerifyToken(bearerHeader);
            const user = await userService.GetUserById(verify.sub);

            req.user = user;
            next();

            // console.log token create and expire date 
            // console.log(moment.unix(verify.iat).format("YYYY-MM-DD hh:mm:ss a"));
            // console.log(moment.unix(verify.exp).format("YYYY-MM-DD hh:mm:ss a"));
        }
        else {
            next(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
        }
    }
    catch {
        res.status(401).send({meta: 4001, message: "token expired"});
        // next(new ApiError(httpStatus.UNAUTHORIZED, "token expired"));
    }
}

export default auth;