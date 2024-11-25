const express = require('express');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Anyone can view all events
router.get('/', eventController.getAllEvents);

// Only admins can create a new event (with image upload)
router.post('/', authMiddleware(['admin']), upload.single('image'), eventController.createEvent);

// Only admins can update an event (with image upload)
router.put('/:id', authMiddleware(['admin']), upload.single('image'), eventController.updateEvent);

// Only admins can delete an event
router.delete('/:id', authMiddleware(['admin']), eventController.deleteEvent);

module.exports = router;
