import httpStatus from "http-status";
import { authService, shopService, tokenService, userService } from "../services";
import catchAsync from "../utils/catchAsync";

const Login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const shop = user.sellCompany != null ? await shopService.GetShopById(user.sellCompany) : null;
    const token = await tokenService.GenerateToken(user.id);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, token, user, shop });
});

const LoginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const token = await tokenService.GenerateToken(user.id);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, token, user });
})

const LoggedInfo = catchAsync(async (req, res) => {
    const user = await userService.GetUserById(req.user._id);
    const shop = user.sellCompany ? await shopService.GetShopById(user.sellCompany) : null;

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, user, shop });
});

const ChangePassword = catchAsync(async (req, res) => {
    if ([1, 2].includes(req.user.type)) {
        const { userId, newPassword } = req.body;
        const user = await authService.changePassword(userId, newPassword);

        return res.status(httpStatus.OK).send({ meta: httpStatus.OK, message: "Password changed successfully", data: user });
    }

    res.status(httpStatus.UNAUTHORIZED).send({ meta: httpStatus.UNAUTHORIZED, message: "Unauthorized" });
});

//TODO register
export default {
    Login,
    LoggedInfo,
    LoginUser,
    ChangePassword,
}