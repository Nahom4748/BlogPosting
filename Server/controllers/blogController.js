const blogService = require("../services/Blog.service");

exports.createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body, req.user.id);
    res.status(201).json(blog);
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
    await blogService.deleteBlog(req.params.id, req.user.id);
    res.status(204).send();
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
    const rating = await blogService.rateBlog(
      req.params.id,
      req.body.rating,
      req.user.id
    );
    res.status(200).json(rating);
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
