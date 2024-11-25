const db = require('./db');

const Booking = {
    create: async (bookingData) => {
        const sql = 'INSERT INTO bookings (ticketCount, eventId, customerId, paymentId, totalAmount) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [bookingData.ticketCount, bookingData.eventId, bookingData.customerId, bookingData.paymentId, bookingData.totalAmount]);
        return result.insertId;
    },
    getAll: async () => {
        const sql = 'SELECT * FROM bookings';
        const [rows] = await db.execute(sql);
        return rows;
    },
    delete: async (id) => {
        const sql = 'DELETE FROM bookings WHERE id = ?';
        await db.execute(sql, [id]);
    },
};

module.exports = Booking;
