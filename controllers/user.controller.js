import httpStatus from "http-status";
import { userService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.createUser({ name: "user 1" });

    res.status(httpStatus.CREATED).send({ meta: 200, datas: user });
});

const GetUsers = catchAsync(async (req, res) => {
    const users = await userService.queryUsers();

    res.status(httpStatus.OK).send({ meta: 200, datas: users });
});

const GetUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId)

    res.status(httpStatus.OK).send({ meta: 200, data: user });
});

const UpdateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUser(req.params.userId, req.body);

    res.status(httpStatus.OK).send({ meta: 200, data: user });
});

const DeleteUser = catchAsync(async (req, res) => {
    const user = await new Promise((resolve, _) => {
        setTimeout(() => resolve({ id: 1, name: "user 2" }), 2000);
    });

    res.status(httpStatus.OK).send({ meta: 200, data: user });
});

export default {
    CreateUser,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser
};