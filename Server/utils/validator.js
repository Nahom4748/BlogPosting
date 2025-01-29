const validator = require("validator");

const validateRegister = (data) => {
  if (!data.username || !data.email || !data.password)
    return "All fields are required";

  const password = data.password.trim();

  if (!validator.isEmail(data.email)) return "Invalid email format";

  if (password.length < 7) {
    return "Password must be at least 7 characters long";
  }

  if (!validator.isStrongPassword(password, { minLength: 7 }))
    return "Password must be at least 7 characters long";

  return null;
};

const validateLogin = (data) => {
  if (!data.email || !data.password) return "Email and password are required";
  if (!validator.isEmail(data.email)) return "Invalid email format";
  return null;
};

module.exports = { validateRegister, validateLogin };
