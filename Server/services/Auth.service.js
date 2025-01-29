const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config"); // Ensure db is using mysql2/promise
const { validateRegister, validateLogin } = require("../utils/validator");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async ({ username, email, password }) => {
  // Check if the username or email already exists
  const [existingUser] = await db.query(
    "SELECT * FROM Users WHERE username = ? OR email = ?",
    [username, email]
  );
  if (existingUser.length > 0) {
    throw new Error("Username or email already exists");
  }

  // Hash the password before inserting it into the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database with sanitized and validated data
  const [result] = await db.query(
    `INSERT INTO Users (username, email, password_hashed) 
     VALUES (?, ?, ?)`,
    [username, email, hashedPassword]
  );

  // Fetch the newly created user to return
  const [newUser] = await db.query("SELECT * FROM Users WHERE user_id = ?", [
    result.insertId,
  ]);
  return newUser;
};

const login = async ({ email, password }) => {
  // Check if the user exists in the database
  const [users] = await db.execute("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);
  if (!users.length) throw new Error("Invalid email or password");

  const user = users[0];

  // Validate the password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password_hashed);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  // Generate a JWT token
  const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h", // The token will expire in 1 hour
  });

  // Return the user data and the generated token
  return {
    user: { id: user.user_id, username: user.username, email: user.email },
    token,
  };
};

module.exports = { register, login };
