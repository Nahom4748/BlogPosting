const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.Routes");
const blogRoutes = require("./routes/blog.Routes");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
