const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Only admins can view all users
router.get('/', authMiddleware(['admin']), userController.getAllUsers);

router.get('/:id', userController.getUserById);

// Only admins can delete a user
router.delete('/:id', authMiddleware(['admin']), userController.deleteUser);

// Only admins can update a user
router.put('/:id', authMiddleware(['admin']), userController.updateUser);

module.exports = router;
