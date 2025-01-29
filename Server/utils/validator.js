const validator = require("validator");

const validateRegister = (data) => {
  if (!data.name || !data.email || !data.password)
    return "All fields are required";
  if (!validator.isEmail(data.email)) return "Invalid email format";
  if (!validator.isStrongPassword(data.password, { minLength: 6 }))
    return "Password must be at least 6 characters long";
  return null;
};

const validateLogin = (data) => {
  if (!data.email || !data.password) return "Email and password are required";
  if (!validator.isEmail(data.email)) return "Invalid email format";
  return null;
};

module.exports = { validateRegister, validateLogin };
