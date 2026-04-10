import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// Get all destinations (Admin)
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ priority: 1, name: 1 });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active destinations (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const destinations = await Destination.find({ status: 'active' }).sort({ priority: 1, name: 1 });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single destination by ID or Slug (Detail Page)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let destination;

        // Try to find by ID if it's a valid ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            destination = await Destination.findById(id);
        }

        // If not found by ID, try finding by slug
        if (!destination) {
            destination = await Destination.findOne({ slug: id });
        }

        if (!destination) return res.status(404).json({ message: 'Destination not found' });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a destination
router.post('/', async (req, res) => {
    const destination = new Destination(req.body);
    try {
        const newDestination = await destination.save();
        res.status(201).json(newDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a destination
router.put('/:id', async (req, res) => {
    try {
        const { _id, __v, ...updateData } = req.body;
        const updatedDestination = await Destination.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        res.json(updatedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
    try {
        await Destination.findByIdAndDelete(req.params.id);
        res.json({ message: 'Destination deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
