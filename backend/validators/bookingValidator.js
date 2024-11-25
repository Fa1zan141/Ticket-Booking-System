const Joi = require('joi');

const bookingValidator = Joi.object({
    ticketCount: Joi.number().integer().positive().required(),
    eventId: Joi.number().required(),
    customerId: Joi.number().required(),
    paymentId: Joi.number().required(),
    totalAmount: Joi.number().positive().required(),
});

module.exports = bookingValidator;
