import httpStatus from "http-status";
import { userService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.CreateUser(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: user });
});

const GetUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['firstName', "lastName", "phoneNumber", "email"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const users = await userService.QueryUsers(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...users });
});

const GetUser = catchAsync(async (req, res) => {
    const user = await userService.GetUserById(req.params.userId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

const UpdateUser = catchAsync(async (req, res) => {
    const user = await userService.UpdateUser(req.params.userId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

const DeleteUser = catchAsync(async (req, res) => {
    const user = await userService.DeleteUserById(req.params.userId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: user });
});

export default {
    CreateUser,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser
};