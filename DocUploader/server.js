const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors()); // Enable CORS for frontend requests

// Set storage engine
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Upload route
app.post("/upload", upload.array("files"), (req, res) => {
    res.json({ message: "Files uploaded successfully!", files: req.files });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
