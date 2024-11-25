const User = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
    
            if (!updates.username && !updates.role && !updates.password) {
                return res.status(400).json({ message: 'No updates provided' });
            }
    
            await User.update(id, updates);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error in updateUser controller:', error);
            res.status(500).json({ message: 'Error updating user', error });
        }
    },    
};

module.exports = userController;
