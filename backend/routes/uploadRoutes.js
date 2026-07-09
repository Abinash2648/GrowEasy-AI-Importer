const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadCSV,
} = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.single("file"),
  uploadCSV
);

module.exports = router;