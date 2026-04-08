import express from 'express';
import ContactInfo from '../models/ContactInfo.js';

const router = express.Router();

// Get contact info
router.get('/', async (req, res) => {
    try {
        let info = await ContactInfo.findOne();
        if (!info) {
            info = new ContactInfo();
            await info.save();
        }
        res.json(info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update contact info
router.put('/', async (req, res) => {
    try {
        const updatedInfo = await ContactInfo.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.json(updatedInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
