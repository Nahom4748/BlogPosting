const { Blog, Comment, BlogRating } = require("../models");
const BlogService = require("../services/Blog.service");

exports.createBlog = async (req, res) => {
  try {
    const blog = await BlogService.createBlog(req.user.UserID, req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await BlogService.updateBlog(
      req.params.id,
      req.user.UserID,
      req.body
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

// Add similar methods for delete, get, ratings, comments
