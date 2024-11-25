const Joi = require('joi');

const paymentValidator = Joi.object({
    cardNumber: Joi.string()
        .creditCard()
        .required(),
    expiryDate: Joi.string()
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
        .required()
        .messages({
            'string.pattern.base': 'Expiry date must be in MM/YY or MM/YYYY format',
        }),
    cvv: Joi.string()
        .length(3)
        .required()
        .messages({
            'string.length': 'CVV must be exactly 3 digits',
        }),
    nameOnCard: Joi.string().required(),
});

module.exports = paymentValidator;
