import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Get all services (Admin)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active services (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const services = await Service.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findOne({ id: req.params.id });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const service = new Service(req.body);
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (req.params.id === 'visa') {
            return res.status(403).json({ message: 'Global Visa Services cannot be deleted.' });
        }
        await Service.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
