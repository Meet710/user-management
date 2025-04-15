const mongoose = require("mongoose");
const ResponseHandler = require("../utils/responseHandler");
const joi = require("joi");
class Validation {
  constructor() {
    this.responseHandler = new ResponseHandler();
  }
  validateUser = (req, res, next) => {
    const payload = joi.object({
      name: joi
        .string()
        .regex(/^[A-Za-z\s]+$/)
        .min(3)
        .required()
        .messages({
          "string.min": "Name must be at least 3 characters long",
          "string.required": "Name is Required",
          "string.pattern.base": "Name must be valid",
        }),
      email: joi
        .string()
        .email()
        .custom((value, helpers) => {
          if (value !== value.toLowerCase()) {
            return helpers.message("Email must be in lowercase");
          }
          return value;
        })
        .required()
        .messages({
          "string.base": "Enter a valid email address",
          "string.email": "Enter a valid email address",
          "any.required": "Email is required",
        }),
      password: joi
        .string()
        .pattern(/^[A-Za-z0-9]{6,30}$/)
        .required()
        .messages({
          "string.pattern.base": "Enter Valid password",
          "any.required": `password is required`,
        }),
      dob: joi.date().iso().max("now").required().messages({
        "date.base": "Enter a valid date",
        "date.iso": "Enter the date in YYYY-MM-DD format",
        "any.required": "Enter the date",
      }),
    });
    console.log(req.body);
    const validation = payload.validate(req.body);
    if (validation.error) {
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.UNPROCESSED,
        message: validation.error.message,
      });
    }
    next();
  };

  validateUserParams = (req, res, next) => {
    const payload = joi.object({
      id: joi
        .string()
        .custom((value, helpers) => {
          if (!mongoose.isValidObjectId(value)) {
            return helpers.message("Invalid user id");
          }
          return value;
        })
        .required()
        .messages({
          "string.required": "User id is required",
        }),
    });
    const validation = payload.validate(req.params);
    if (validation.error) {
      return this.responseHandler.send(res, {
        status: this.responseHandler.getCode().codes.UNPROCESSED,
        message: validation.error.message,
      });
    }
    next();
  };
}

module.exports = new Validation();
