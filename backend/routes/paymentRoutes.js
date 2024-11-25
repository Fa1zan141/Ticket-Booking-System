const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const paymentValidator = require('../validators/paymentValidator');

const router = express.Router();

// Only authenticated users can make payments
router.post('/', authMiddleware(['user']), validateMiddleware(paymentValidator), paymentController.createPayment);

module.exports = router;
