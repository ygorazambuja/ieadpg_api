import { Router } from "express";
import { upload } from "./configs/multer";

import { FileUploadController } from "./controllers/FileUploadController";

const router = Router();

router.post(
  "/import",
  upload.single("file"),
  new FileUploadController().handle
);

export default router;
