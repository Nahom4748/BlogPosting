const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload");

router.post(
  "/register",
  upload.single("profile_picture"),
  authController.register
);
router.post("/login", login);

module.exports = router;
