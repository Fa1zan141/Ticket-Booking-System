const db = require('./db');
const bcrypt = require('bcrypt');
const User = {
    create: async (userData) => {
        const sql = 'INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(sql, [userData.email, userData.username, userData.password, userData.role]);
        return result.insertId;
    },
    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    },
    updateLastLogin: async (userId) => {
        const sql = 'UPDATE users SET last_login = ? WHERE id = ?';
        const now = new Date();
        await db.execute(sql, [now, userId]);
        return now;
    },
    findById: async (id) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    },
    getAll: async () => {
        const sql = 'SELECT id, email, username, role, created_at, last_login FROM users WHERE role = "user"';
        const [rows] = await db.execute(sql);
        return rows;
    },
    delete: async (id) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        await db.execute(sql, [id]);
    },
    update: async (id, updates) => {
        try {
            let sql = 'UPDATE users SET ';
            const params = [];
    
            if (updates.username) {
                sql += 'username = ?, ';
                params.push(updates.username);
            }
    
            if (updates.role) {
                sql += 'role = ?, ';
                params.push(updates.role);
            }
    
            if (updates.password) {
                const hashedPassword = await bcrypt.hash(updates.password, 10);
                sql += 'password = ?, ';
                params.push(hashedPassword);
            }
    
            sql = sql.slice(0, -2) + ' WHERE id = ?'; 
            params.push(id);
    
            await db.execute(sql, params);
        } catch (error) {
            console.error('Error in update method:', error);
            throw error; 
        }
    }    
};

module.exports = User;
