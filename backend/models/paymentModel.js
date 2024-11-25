const db = require('./db');

const Payment = {
    create: async (paymentData) => {
        const sql = 'INSERT INTO payments (cardNumber, expiryDate, cvv, nameOnCard) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            paymentData.cardNumber,
            paymentData.expiryDate,
            paymentData.cvv,
            paymentData.nameOnCard,
        ]);
        return result.insertId;
    },
};

module.exports = Payment;
