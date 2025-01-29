const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.Routes");
const blogRoutes = require("./routes/blog.Routes");

const app = express();

// Enable CORS
app.use(cors()); // CORS policy can be set here, or you can customize it further

// Use Helmet to secure HTTP headers
app.use(helmet()); // Adds security-related HTTP headers to protect

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
