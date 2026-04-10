import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Get all services (Admin)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ priority: 1, title: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only active services (Public Grid)
router.get('/active', async (req, res) => {
    try {
        const services = await Service.find({ status: 'active' }).sort({ priority: 1, createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single service by ID
router.get('/:id', async (req, res) => {
    try {
        // Handle custom 'visa' ID or regular ObjectId
        let query = { _id: req.params.id };
        
        // If it's a valid ObjectId, use findById, otherwise search by _id string or another field if needed
        const service = await Service.findOne(query);
        
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
        const { _id, __v, ...updateData } = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Fetch the service first to check its title
        const service = await Service.findById(req.params.id);
        if (service && (req.params.id === 'visa' || (service.title && service.title.toLowerCase().includes('visa')))) {
            return res.status(403).json({ message: 'System Service: Global Visa Services cannot be deleted as it manages country requirements.' });
        }
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
