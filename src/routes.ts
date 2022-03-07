import { Router } from "express";
import { upload } from "./configs/multer";

import { FileUploadController } from "./controllers/FileUploadController";
import { MemberFileController } from "./controllers/MemberFileController";

const router = Router();

router.post(
  "/import",
  upload.single("file"),
  new FileUploadController().handle
);

router.post("/member-file", new MemberFileController().handle);

export default router;
