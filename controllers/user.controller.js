import httpStatus from "http-status";
import { userService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, user });
});

const GetUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);

    const users = await userService.queryUsers(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...users });
});

const GetUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

const UpdateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUser(req.params.userId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

const DeleteUser = catchAsync(async (req, res) => {
    const user = await userService.deleteUserById(req.params.userId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

export default {
    CreateUser,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser
};