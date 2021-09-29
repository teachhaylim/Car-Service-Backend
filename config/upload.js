import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import { checkFileType } from "../utils/generalFuncs";
import config from "./config";
import crypto from "crypto";
import path from "path";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

const storage = new GridFsStorage({
    url: config.mongoose.url,
    options: {
        useUnifiedTopology: true,
    },
    file: (_, file) => {
        return new Promise((resolve, __) => {
            if (checkFileType(file)) throw new ApiError(httpStatus.BAD_REQUEST, "Wrong file type{s}");

            crypto.randomBytes(16, (err, buf) => {
                if (err) throw new ApiError(httpStatus.BAD_REQUEST, err.message);

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    metadata: { originalname: file.originalname },
                    filename: filename,
                    bucketName: "upload",
                };

                return resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

export default upload;