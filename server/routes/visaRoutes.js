import express from 'express';
import VisaCountry from '../models/VisaCountry.js';

const router = express.Router();

// Get all visa countries (Admin)
router.get('/', async (req, res) => {
    try {
        const countries = await VisaCountry.find().sort({ name: 1 });
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active visa countries (Public)
router.get('/active', async (req, res) => {
    try {
        const countries = await VisaCountry.find({ status: 'active' }).sort({ name: 1 });
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single visa country
router.get('/:id', async (req, res) => {
    try {
        const country = await VisaCountry.findOne({ id: req.params.id });
        if (!country) return res.status(404).json({ message: 'Country not found' });
        res.json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new visa country
router.post('/', async (req, res) => {
    const country = new VisaCountry(req.body);
    try {
        const newCountry = await country.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update visa country
router.put('/:id', async (req, res) => {
    try {
        const updatedCountry = await VisaCountry.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedCountry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete visa country
router.delete('/:id', async (req, res) => {
    try {
        await VisaCountry.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Country deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
