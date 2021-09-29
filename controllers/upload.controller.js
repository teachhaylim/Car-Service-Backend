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
    const file = await uploadService.GetFileByFilename(req.params.filename);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, file: file });
});

const DeleteFile = catchAsync(async (req, res) => {
    const file = await uploadService.DeleteFileService(req.params.filename);

    res.status(httpStatus.OK).send({ meta: httpStatus.OK, file: file });
});

export default {
    UploadFile,
    GetFile,
    GetFileObject,
    DeleteFile,
}