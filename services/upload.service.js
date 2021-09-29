import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { gfs, gridFSBucket } from "../config/upload";
import { fileType } from "../utils/generalFuncs";

const GetFileService = async (filename) => {
    const file = await gfs.files.findOne({ filename: filename });
    let readStream;

    if (!file) throw new ApiError(httpStatus.OK, "File no exist");

    if (fileType.includes(file.contentType)) {
        readStream = gridFSBucket.openDownloadStream(file._id);
    }

    return readStream;
};

const GetFileObjectService = async (filename) => {

};

const DeleteFileService = async (filename) => {

};

export default {
    GetFileService,
    GetFileObjectService,
    DeleteFileService,
}