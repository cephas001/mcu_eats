export default class MulterFileStorageService {
  constructor(upload, fileSystem = fs) {
    this.upload = upload;
    this.fs = fileSystem;
  }

  async saveImage(req, fieldName = "file") {
    await new Promise((resolve, reject) => {
      this.upload.single(fieldName)(req, null, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (!req.file) {
      console.log("No file uploaded");
      return null;
    }

    return {
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${
        req.file.filename
      }`,
    };
  }

  async deleteFile(filePath) {
    try {
      await this.fs.unlink(`.${filePath}`);
    } catch (err) {
      throw new Error(`Failed to delete file at ${filePath}: ${err.message}`);
    }
  }
}
