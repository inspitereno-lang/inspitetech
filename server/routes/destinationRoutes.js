import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// Get all destinations (Admin)
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active destinations (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const destinations = await Destination.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single destination by custom ID (Detail Page)
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findOne({ id: req.params.id });
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
        const updatedDestination = await Destination.findOneAndUpdate(
            { id: req.params.id },
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
        await Destination.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Destination deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
