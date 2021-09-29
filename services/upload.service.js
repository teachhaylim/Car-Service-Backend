import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { collectionName, gfs, gridFSBucket } from "../config/upload";
import { fileType } from "../utils/generalFuncs";

const GetFileByFilename = async (filename) => {
    const file = await gfs.files.findOne({ filename: filename });

    if (!file) throw new ApiError(httpStatus.NOT_FOUND, "File no exist");

    return file;
};

const GetFileService = async (filename) => {
    const file = await GetFileByFilename(filename);

    if (fileType.includes(file.contentType)) {
        return gridFSBucket.openDownloadStream(file._id);
    }
};

const DeleteFileService = async (filename) => {
    const file = await GetFileByFilename(filename);

    console.log(gfs.remove())

    const err = await gfs.remove({ _id: file._id, root: collectionName });

    if (!err) {
        console.log(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "File delete error");
    }

    return file;
};

export default {
    GetFileService,
    GetFileByFilename,
    DeleteFileService,
}