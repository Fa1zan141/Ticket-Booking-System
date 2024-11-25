const Booking = require('../models/bookingModel');

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.getAll();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching bookings', error });
        }
    },

    createBooking: async (req, res) => {
        try {
            const bookingDetails = req.body;
            await Booking.create(bookingDetails);
            res.status(201).json({ message: 'Booking created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating booking', error });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const { id } = req.params;
            await Booking.delete(id);
            res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting booking', error });
        }
    },
};

module.exports = bookingController;
