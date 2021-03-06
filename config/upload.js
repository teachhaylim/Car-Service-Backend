import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { checkFileType } from "../utils/generalFuncs";
import config from "./config";
import crypto from "crypto";
import path from "path";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import { logger } from ".";

const connection = mongoose.createConnection(config.mongoose.url, {});
export const collectionName = "uploads";
export let gfs;
export let gridFSBucket;

connection.on("open", () => {
    logger.info("Grid connected to db");
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection(collectionName);
    gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: collectionName });
});

connection.on("close", () => {
    logger.info("Grid disconnected from db");
})

const storage = new GridFsStorage({
    url: config.mongoose.url,
    options: { useUnifiedTopology: true },
    file: (_, file) => {
        return new Promise((resolve, __) => {
            if (checkFileType(file)) throw new ApiError(httpStatus.BAD_REQUEST, "Wrong file type(s)");

            crypto.randomBytes(16, (err, buf) => {
                if (err) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    metadata: { originalname: file.originalname },
                    filename: filename,
                    bucketName: collectionName,
                };

                return resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

export default upload;