const { Joi } = require("express-validation");

const registerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    image: Joi.string().optional(),
  }),
};

const loginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { loginSchema, registerSchema };