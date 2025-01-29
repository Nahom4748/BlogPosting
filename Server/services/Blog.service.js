const db = require("../config/db.config.js");
const { sanitizeInput } = require("../utils/sanitizer.js");

exports.createBlog = async (data, userId) => {
  const { title, content } = sanitizeInput(data);
  const [result] = await db.execute(
    "INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, userId]
  );
  return { id: result.insertId, title, content, userId };
};

exports.updateBlog = async (id, data, userId) => {
  const { title, content } = sanitizeInput(data);
  await db.execute(
    "UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?",
    [title, content, id, userId]
  );
  return { id, title, content, userId };
};

exports.deleteBlog = async (id, userId) => {
  try {
    // Delete comments related to the blog
    await db.execute("DELETE FROM comments WHERE blog_id = ?", [id]);

    // Delete ratings related to the blog
    await db.execute("DELETE FROM ratings WHERE blog_id = ?", [id]);

    // Now delete the blog itself
    const result = await db.execute(
      "DELETE FROM blogs WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    // Check if any rows were deleted
    if (result.affectedRows === 0) {
      throw new Error("Blog not found or not authorized to delete this blog.");
    }

    return { message: "Blog deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};

exports.getBlog = async (id) => {
  // Fetch blog post details
  const [blogRows] = await db.execute("SELECT * FROM blogs WHERE id = ?", [id]);

  if (blogRows.length === 0) {
    throw new Error("Blog not found");
  }

  const blog = blogRows[0];

  // Fetch comments for the blog post
  const [commentsRows] = await db.execute(
    "SELECT * FROM comments WHERE blog_id = ?",
    [id]
  );

  // Fetch ratings for the blog post (assuming the user has already rated it or the average rating is stored)
  const [ratingsRows] = await db.execute(
    "SELECT rating FROM ratings WHERE blog_id = ?",
    [id]
  );

  // Calculate average rating (if you want to show the average rating)
  const averageRating =
    ratingsRows.length > 0
      ? ratingsRows.reduce((acc, { rating }) => acc + rating, 0) /
        ratingsRows.length
      : null;

  return {
    blog,
    comments: commentsRows,
    averageRating: averageRating,
  };
};

exports.rateBlog = async (blogId, rating, userId) => {
  await db.execute(
    "INSERT INTO ratings (blog_id, rating, user_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?",
    [blogId, rating, userId, rating]
  );
  return { blogId, rating, userId };
};

exports.addComment = async (blogId, comment, userId) => {
  const sanitizedComment = sanitizeInput({ comment }).comment;
  const [result] = await db.execute(
    "INSERT INTO comments (blog_id, comment, user_id) VALUES (?, ?, ?)",
    [blogId, sanitizedComment, userId]
  );
  return { id: result.insertId, blogId, comment: sanitizedComment, userId };
};
