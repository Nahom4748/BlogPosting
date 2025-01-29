const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const { sanitizeInput } = require("../utils/sanitizer");
const { validateRegister, validateLogin } = require("../utils/validator");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (userData) => {
  const { name, email, password } = sanitizeInput(userData);

  // Validate input data
  const validationError = validateRegister({ name, email, password });
  if (validationError) throw new Error(validationError);

  // Check if email already exists
  const [existingUser] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (existingUser.length) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into database
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  return { id: result.insertId, name, email };
};

const login = async (credentials) => {
  const { email, password } = sanitizeInput(credentials);

  // Validate input data
  const validationError = validateLogin({ email, password });
  if (validationError) throw new Error(validationError);

  // Check if user exists
  const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (!users.length) throw new Error("Invalid email or password");

  const user = users[0];

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

module.exports = { register, login };
