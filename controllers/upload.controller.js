import httpStatus from "http-status";
import uploadService from "../services/upload.service";
import catchAsync from "../utils/catchAsync"

const UploadFile = catchAsync(async (req, res) => {
    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, file: req.file });
});

const UploadFiles = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).json({ meta: httpStatus.OK, files: req.files });
});

const GetFile = catchAsync(async (req, res) => {
    const file = await uploadService.GetFileService(req.params.filename);

    console.log(`outside file`, file)

    file.pipe(res);
});

const GetFileObject = catchAsync(async (req, res) => {

});

const DeleteFile = catchAsync(async (req, res) => {

});

export default {
    UploadFile,
    UploadFiles,
    GetFile,
    GetFileObject,
    DeleteFile,
}