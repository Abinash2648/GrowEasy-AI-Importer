const fs = require("fs");

const readCSVFile = (path) => {
  return fs.readFileSync(path, "utf8");
};

const deleteUploadedFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

module.exports = {
  readCSVFile,
  deleteUploadedFile,
};