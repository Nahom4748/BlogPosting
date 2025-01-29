const { Blog } = require("../models");

class BlogService {
  static async createBlog(userId, blogData) {
    return await Blog.create({ ...blogData, UserID: userId });
  }

  static async updateBlog(blogId, userId, updateData) {
    const blog = await Blog.findByPk(blogId);
    if (blog.UserID !== userId) throw new Error("Unauthorized");
    return await blog.update(updateData);
  }

  static async getBlogWithComments(blogId) {
    return await Blog.findByPk(blogId, {
      include: ["comments", "ratings"],
    });
  }
}

module.exports = BlogService;
