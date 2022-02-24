import multer from "multer";
import path from "path";
import { tmpdir } from "os";

export const upload = multer({
  storage: multer.diskStorage({
    filename: (_, file, cb) => {
      cb(null, path.join(file.originalname));
    },
    destination: (_, __, cb) => {
      cb(null, tmpdir());
    },
  }),
});
