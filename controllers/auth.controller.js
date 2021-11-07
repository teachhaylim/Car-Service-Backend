import httpStatus from "http-status";
import { authService, shopService, tokenService, userService } from "../services";
import catchAsync from "../utils/catchAsync";

const Login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const shop = await shopService.GetShopById(user.sellCompany);
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

//TODO register, forget password

export default {
    Login,
    LoggedInfo,
    LoginUser,
}