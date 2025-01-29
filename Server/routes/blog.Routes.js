const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/", authenticateToken, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", authenticateToken, deleteBlog);

module.exports = router;
