import MulterFileStorageService from "../infrastructure/services/MulterFileStorageService.js";

import multer from "multer";
import path from "path";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const fileStorageService = new MulterFileStorageService(upload, fs);
