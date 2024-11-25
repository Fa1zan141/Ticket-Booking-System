const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Dummy route for testing authMiddleware
router.get('/test-auth', authMiddleware(['admin']), (req, res) => {
    res.status(200).json({ message: 'Middleware test passed', user: req.user });
});

module.exports = router;
