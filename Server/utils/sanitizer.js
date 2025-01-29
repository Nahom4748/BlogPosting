const sanitizeHtml = require("sanitize-html");

/**
 * Sanitizes input fields by removing malicious content.
 * @param {Object} inputData - Object containing user input.
 * @returns {Object} - Sanitized input object.
 */
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
