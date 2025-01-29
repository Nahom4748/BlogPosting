// controllers/Auth.controller.js
const authService = require("../services/Auth.service");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let profilePicture = null;

    // If there is a file uploaded, assign its path
    if (req.file) {
      profilePicture = req.file.path; // The file path where the image is stored
    }

    // Ensure all required fields are provided
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Pass the data to the authService to handle registration logic
    const user = await authService.register({
      username,
      email,
      password,
      role: role || "user", // Default to 'user' role
      profile_picture: profilePicture,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the login service to authenticate the user
    const { user, token } = await authService.login({ email, password });

    // Return success response with user data and token
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    // Return error response if there's an issue (e.g., invalid credentials)
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
