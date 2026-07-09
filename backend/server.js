const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GrowEasy AI Importer Backend Running 🚀",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});