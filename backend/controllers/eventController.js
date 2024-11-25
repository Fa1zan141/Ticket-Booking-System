const Event = require('../models/eventModel');

const eventController = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.getAll();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching events', error });
        }
    },

    createEvent: async (req, res) => {
        try {
            const eventDetails = req.body;

            // Add the image path to the event data
            eventDetails.image = req.file ? req.file.path : null;

            await Event.create(eventDetails);
            res.status(201).json({ message: 'Event created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating event', error });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const { id } = req.params;
            await Event.delete(id);
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting event', error });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Add the image path to the update data
            updates.image = req.file ? req.file.path : null;

            await Event.update(id, updates);
            res.status(200).json({ message: 'Event updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating event', error });
        }
    },
};

module.exports = eventController;
