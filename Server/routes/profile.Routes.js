const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const profileController = require("../controllers/profileController");

// Set up file upload configuration with Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
  },
});

// Route to get the user's profile
router.get("/profile", authMiddleware, profileController.getProfile);

// Route to update the user's profile (including bio and profile picture)
router.put(
  "/profile",
  authMiddleware,
  upload.single("profile_picture"),
  profileController.updateProfile
);

module.exports = router;
