const express = require('express');
const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

// Registration for both users and admins
router.post('/register', validateMiddleware(registerValidator), authController.register);

// Common login for both admin and user
router.post('/login', validateMiddleware(loginValidator), authController.login);

module.exports = router;
