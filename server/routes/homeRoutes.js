import express from 'express';
import mongoose from 'mongoose';
import HomeSettings from '../models/HomeSettings.js';
import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import Service from '../models/Service.js';

const router = express.Router();

// Get curation settings
router.get('/settings', async (req, res) => {
    try {
        let settings = await HomeSettings.findOne();
        if (!settings) {
            settings = await HomeSettings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update curation settings
router.put('/settings', async (req, res) => {
    try {
        let settings = await HomeSettings.findOne();
        if (!settings) {
            settings = new HomeSettings(req.body);
        } else {
            settings.destinations = req.body.destinations;
            settings.packages = req.body.packages;
            settings.services = req.body.services;
        }
        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get curated content for homepage
router.get('/content', async (req, res) => {
    try {
        let settings = await HomeSettings.findOne();
        // Provide safe defaults if no settings exist
        if (!settings) {
            settings = {
                destinations: { items: [], limit: 6, show: true },
                packages: { items: [], limit: 6, show: true },
                services: { items: [], limit: 6, show: true }
            };
        }

        // Fetch data for each section
        const fetchData = async (Model, itemIds, limit, show) => {
            if (!show) return [];
            
            let items = [];
            if (itemIds && itemIds.length > 0) {
                // IMPORTANT: Separate custom slugs (like 'london') from technical ObjectIDs
                // to prevent Mongoose CastErrors when querying the _id field.
                const validObjectIds = itemIds.filter(id => mongoose.Types.ObjectId.isValid(id));
                
                // Fetch specific items in the correct order
                const fetchedItems = await Model.find({ 
                    $or: [
                        { id: { $in: itemIds } },
                        { _id: { $in: validObjectIds } }
                    ]
                });
                
                // Reorder according to itemIds
                items = itemIds.map(id => fetchedItems.find(item => (
                    item.id === id || 
                    (item._id && item._id.toString() === id)
                ))).filter(Boolean);
            } else {
                // Fallback: fetch latest active items if none selected
                items = await Model.find({ status: 'active' }).limit(limit);
            }
            
            return items.slice(0, limit);
        };

        const homeContent = {
            destinations: await fetchData(Destination, settings.destinations?.items, settings.destinations?.limit, settings.destinations?.show),
            packages: await fetchData(Package, settings.packages?.items, settings.packages?.limit, settings.packages?.show),
            services: await fetchData(Service, settings.services?.items, settings.services?.limit, settings.services?.show)
        };

        res.json(homeContent);
    } catch (error) {
        console.error('Home Content Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
