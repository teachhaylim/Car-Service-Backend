import httpStatus from "http-status";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.createUser({ id: 1, name: "user 1" });

    res.status(httpStatus.CREATED).send({ meta: 200, datas: user });
});

const GetUsers = catchAsync(async (req, res) => {
    const users = await new Promise((resolve, _) => {
        setTimeout(() => resolve([4, 5, 6]), 3000);
    });

    res.status(httpStatus.OK).send({ meta: 200, datas: users });
});

const GetUser = catchAsync(async (req, res) => {
    const user = await new Promise((resolve, _) => {
        setTimeout(() => resolve({ id: 1, name: "user 1" }), 2000);
    });

    res.status(httpStatus.OK).send({ meta: 200, data: user });
});

const UpdateUser = catchAsync(async (req, res) => {
    const user = await new Promise((resolve, _) => {
        setTimeout(() => resolve({ id: ~~(Math.random() * 2) + 1, name: "user 2" }), 2000);
    });

    if (user.id !== 2) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

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