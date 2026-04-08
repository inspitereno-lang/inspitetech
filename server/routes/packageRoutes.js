import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// Get all packages (Admin)
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find().sort({ createdAt: -1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active packages (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const packages = await Package.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single package by ID
router.get('/:id', async (req, res) => {
    try {
        const tourPackage = await Package.findOne({ id: req.params.id });
        if (!tourPackage) return res.status(404).json({ message: 'Package not found' });
        res.json(tourPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const tourPackage = new Package(req.body);
    try {
        const newPackage = await tourPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Package.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
