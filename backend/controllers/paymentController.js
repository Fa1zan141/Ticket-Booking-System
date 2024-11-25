const Payment = require('../models/paymentModel');

const paymentController = {
    createPayment: async (req, res) => {
        try {
            const paymentDetails = req.body;

            // Save payment details to the database
            const paymentId = await Payment.create(paymentDetails);

            res.status(201).json({ message: 'Payment processed successfully', paymentId });
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(500).json({ message: 'Error processing payment', error });
        }
    },
};

module.exports = paymentController;
