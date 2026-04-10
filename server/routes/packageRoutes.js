import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// Get all packages (Admin)
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find().sort({ priority: 1, title: 1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active packages (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const packages = await Package.find({ status: 'active' }).sort({ priority: 1, title: 1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single package by ID or Slug
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let tourPackage;

        // Try to find by ID if it's a valid ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            tourPackage = await Package.findById(id);
        }

        // If not found by ID, try finding by slug
        if (!tourPackage) {
            tourPackage = await Package.findOne({ slug: id });
        }

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
        const { _id, __v, ...updateData } = req.body;
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
