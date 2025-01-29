const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (inputData) => {
  let sanitizedData = {};

  for (let key in inputData) {
    if (typeof inputData[key] === "string") {
      sanitizedData[key] = sanitizeHtml(inputData[key].trim());
    } else {
      sanitizedData[key] = inputData[key];
    }
  }

  return sanitizedData;
};

module.exports = { sanitizeInput };
