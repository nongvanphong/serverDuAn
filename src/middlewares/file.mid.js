const fs = require("fs");
var path = require("path");
const httpStatus = require("../../configs/httptatus");
// delete image
const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("erro delete file:", err);
        return false; // erro
      }
      return true; // sussecc
    });
  }
};

const moveFile = (sourcePath, destinationPath, newSourcePath) => {
  // Create a destination directory if it doesn't already exist
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
  //move file
  fs.rename(sourcePath, newSourcePath, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
};

const storeFile = (req, res, next) => {
  const file = req.file;
  if (!file)
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "upload file fail!",
    });

  const sourcePath = `uploads/private/images/temps/${file.filename}`;
  const newSourcePath = path.join(
    __dirname,
    "..",
    "..",
    "uploads/public/store/idstore/beverage",
    file.filename
  );
  const destinationPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads/public/store/idstore/beverage"
  );

  if (moveFile(sourcePath, destinationPath, newSourcePath) == false) {
    if (deleteFile(sourcePath) == true) {
      return;
    }
    return;
  }
  req.fileResult = file.filename;
  return next();
};

module.exports = {
  storeFile,
};
