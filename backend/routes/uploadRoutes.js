/*const express = require("express");

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
*/
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Route is working"
  });
});

router.post("/upload", (req, res) => {
  res.json({
    success: true,
    message: "Upload route reached"
  });
});

module.exports = router;