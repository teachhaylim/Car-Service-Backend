import express from 'express';
import { upload } from '../config';
import { uploadController } from '../controllers';
import { auth } from '../middleware';

const uploadRoute = express.Router();

uploadRoute.route("/upload")
    .post(auth, upload.single("file"), uploadController.UploadFile);

uploadRoute.route("/uploads")
    .post(auth, upload.array("file"), uploadController.UploadFile);

uploadRoute.route("/:filename")
    .get(uploadController.GetFile)
    .delete(auth, uploadController.DeleteFile);

uploadRoute.route("/object/:filename")
    .get(auth, uploadController.GetFileObject);

export default uploadRoute;