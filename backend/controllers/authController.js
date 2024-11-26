const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // Register a user
    register: async (req, res) => {
        try {
            const { email, username, password, role } = req.body;
              console.log(req.body);
            // Default role to "user" if not provided
            const userRole = role || 'user';

            // const hashedPassword = await bcrypt.hash(password, 10);

            const userId = await User.create({
                email,
                username: userRole === 'admin' ? null : username,
                password: password,
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
    
            // Log the received credentials (ensure sensitive information is not leaked in production logs)
            console.log("Login request:", req.body);
    
            // Check if the user exists by email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
    
            // Verify password
            // const isValidPassword = await bcrypt.compare(password, user.password);
            if (password === user.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
    
            // Generate JWT token with user id and role
            const token = jwt.sign(
                { id: user.id, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
    
            // Update last login timestamp
            const lastLoginTime = await User.updateLastLogin(user.id);
    
            // Respond with the token, role, and last login time
            res.status(200).json({ 
                message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successful`, 
                token, 
                userId: user.id,
                role: user.role, // Explicitly include the role in the response
                last_login: lastLoginTime 
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: 'Error logging in', error });
        }
    },
    
};

module.exports = authController;
