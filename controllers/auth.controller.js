import { authService, tokenService } from "../services";
import catchAsync from "../utils/catchAsync";

const Login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const token = tokenService.generateToken(user.id);

    res.send({ token, user });
});

export default {
    Login,
}