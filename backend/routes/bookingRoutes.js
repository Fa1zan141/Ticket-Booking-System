const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Only admins can view all bookings
router.get('/', authMiddleware(['admin']), bookingController.getAllBookings);

// Users can create a booking
router.post('/', authMiddleware(['user']), bookingController.createBooking);

// Only admins can delete a booking
router.delete('/:id', authMiddleware(['admin']), bookingController.deleteBooking);

module.exports = router;
