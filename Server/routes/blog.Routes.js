const express = require("express");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/").post(authMiddleware, blogController.createBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .put(authMiddleware, blogController.updateBlog)
  .delete(authMiddleware, blogController.deleteBlog);

router.route("/:id/ratings").post(authMiddleware, blogController.rateBlog);

router.route("/:id/comments").post(authMiddleware, blogController.addComment);

module.exports = router;
