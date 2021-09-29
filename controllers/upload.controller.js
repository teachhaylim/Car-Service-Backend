import httpStatus from "http-status";
import uploadService from "../services/upload.service";
import catchAsync from "../utils/catchAsync";

const UploadFile = catchAsync(async (req, res) => {
    res.status(httpStatus.CREATED).send({ meta: httpStatus.CREATED, file: req.file });
});

const GetFile = catchAsync(async (req, res) => {
    const file = await uploadService.GetFileService(req.params.filename, res);

    res.writeHead(httpStatus.OK, { 'Content-Type': 'image/png' });

    file.pipe(res);
});

const GetFileObject = catchAsync(async (req, res) => {

});

const DeleteFile = catchAsync(async (req, res) => {

});

export default {
    UploadFile,
    GetFile,
    GetFileObject,
    DeleteFile,
}