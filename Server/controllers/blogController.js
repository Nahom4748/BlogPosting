const blogService = require("../services/Blog.service");

exports.createBlog = async (req, res) => {
  try {
    // Pass the request body data and the user ID from the middleware
    const blog = await blogService.createBlog(req.body, req.body.userId);
    res.status(201).json(blog); // Return the created blog data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteBlog(req.params.id, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    const result = await blogService.rateBlog(id, rating, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await blogService.addComment(
      req.params.id,
      req.body.comment,
      req.user.id
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
