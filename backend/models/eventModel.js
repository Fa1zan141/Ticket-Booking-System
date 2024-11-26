const db = require('./db');

const Event = {
    create: async (eventData) => {
        const sql = 'INSERT INTO events (name, location, date, time, price, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            eventData.name,
            eventData.location,
            eventData.date,
            eventData.time,
            eventData.price,
            eventData.description,
            eventData.image,
        ]);
        return result.insertId;
    },
    getAll: async () => {
        const sql = 'SELECT * FROM events';
        const [rows] = await db.execute(sql);
        return rows;
    },
    getById: async (id) => {
        const sql = 'SELECT * FROM events WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    },    
    delete: async (id) => {
        const sql = 'DELETE FROM events WHERE id = ?';
        await db.execute(sql, [id]);
    },
    update: async (id, updates) => {
        const sql = 'UPDATE events SET name = ?, location = ?, date = ?, time = ?, price = ?, description = ?, image = ? WHERE id = ?';
        await db.execute(sql, [
            updates.name,
            updates.location,
            updates.date,
            updates.time,
            updates.price,
            updates.description,
            updates.image,
            id,
        ]);
    },
};

module.exports = Event;
