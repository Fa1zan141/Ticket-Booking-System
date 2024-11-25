const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // Register a user
    register: async (req, res) => {
        try {
            const { email, username, password, role } = req.body;

            // Default role to "user" if not provided
            const userRole = role || 'user';

            const hashedPassword = await bcrypt.hash(password, 10);

            const userId = await User.create({
                email,
                username: userRole === 'admin' ? null : username,
                password: hashedPassword,
                role: userRole,
            });

            const token = jwt.sign({ id: userId, role: userRole }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(201).json({ message: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} registered successfully`, token });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    },

    // Login for both admin and user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findByEmail(email);
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            // Update last_login
            const lastLoginTime = await User.updateLastLogin(user.id);
            res.status(200).json({ message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successful`, token, last_login: lastLoginTime, });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    },
};

module.exports = authController;
