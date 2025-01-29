// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = { userId: decoded.userId };
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
