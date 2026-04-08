import express from 'express';
import TeamMember from '../models/TeamMember.js';

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create team member
router.post('/', async (req, res) => {
    const member = new TeamMember(req.body);
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update team member
router.put('/:id', async (req, res) => {
    try {
        const updatedMember = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete team member
router.delete('/:id', async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
