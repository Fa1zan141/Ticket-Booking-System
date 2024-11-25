const Joi = require('joi');

const registerValidator = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).when('role', { is: 'user', then: Joi.required() }), // Username required for users only
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').optional(), // Default role is 'user'
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerValidator, loginValidator };
