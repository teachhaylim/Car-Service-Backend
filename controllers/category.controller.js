import httpStatus from "http-status";
import { categoryService } from "../services";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/generalFuncs";

const CreateCategory = catchAsync(async (req, res) => {
    const category = await categoryService.CreateCategory(req.body);

    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, data: category });
});

const QueryCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["name"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const categories = await categoryService.QueryCategories(filter, options);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, ...categories });
});

const GetCategory = catchAsync(async (req, res) => {
    const category = await categoryService.GetCategoryById(req.params.categoryId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: category });
});

const UpdateCategory = catchAsync(async (req, res) => {
    const category = await categoryService.UpdateCategory(req.params.categoryId, req.body);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: category });
});

const DeleteCategory = catchAsync(async (req, res) => {
    const category = await categoryService.DeleteCategoryById(req.params.categoryId);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, data: category });
});

export default {
    CreateCategory,
    QueryCategories,
    GetCategory,
    UpdateCategory,
    DeleteCategory,
}