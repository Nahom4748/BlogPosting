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
  await db.execute("DELETE FROM blogs WHERE id = ? AND user_id = ?", [
    id,
    userId,
  ]);
};

exports.getBlog = async (id) => {
  const [rows] = await db.execute("SELECT * FROM blogs WHERE id = ?", [id]);
  return rows[0];
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
