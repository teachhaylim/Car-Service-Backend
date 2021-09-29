import Grid from "gridfs-stream";
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../config/config";
import ApiError from "../utils/ApiError";

const conn = mongoose.createConnection(config.mongoose.url, {});
let gfs = null;

conn.on("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("upload");
});

const GetFileService = async (filename) => {
    const file = await gfs.files.findOne({ filename: filename });

    if (!file) throw new ApiError(httpStatus.OK, "File no exist");

    if (file.contentType === "application/pdf") {
        return gfs.createReadStream(file.filename);
    } else if (["image/jpeg", "image/png"].includes(file.contentType)) {
        const stream = gfs.createReadStream({ _id: file._id, filename: file.filename });
        console.log(gfs.createReadStream);

        return stream;
    }
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