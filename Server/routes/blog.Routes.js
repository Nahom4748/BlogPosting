const router = require("express").Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/auth.middleware");

router.route("/").post(authMiddleware, blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlog)
  .put(authMiddleware, blogController.updateBlog)
  .delete(authMiddleware, blogController.deleteBlog);

router.route("/:id/ratings").post(authMiddleware, blogController.rateBlog);

router.route("/:id/comments").post(authMiddleware, blogController.addComment);

export default router;
