const Joi = require('joi');

const eventValidator = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().optional(),
    image: Joi.string().optional(), 
});

module.exports = eventValidator;
