const db = require("../config/db");

exports.createBlog = (req, res) => {
  const { title, content } = req.body;
  const sql = "INSERT INTO blogs (user_id, title, content) VALUES (?, ?, ?)";

  db.query(sql, [req.user.id, title, content], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Blog created" });
  });
};

exports.getBlogs = (req, res) => {
  const sql = "SELECT * FROM blogs";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBlogById = (req, res) => {
  const sql = "SELECT * FROM blogs WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.deleteBlog = (req, res) => {
  const sql = "DELETE FROM blogs WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(403).json({ error: "Not authorized" });
    res.json({ message: "Blog deleted" });
  });
};
