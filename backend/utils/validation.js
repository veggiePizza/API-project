// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);
    //res.status(400).json({ message: "Validation error", statusCode: 400, errors })
    const err = Error("Validation error");
    err.status = 400;
    err.errors = errors;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};