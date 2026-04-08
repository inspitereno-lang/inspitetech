import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    items: [{
        type: String, // Storing slugs/IDs
    }],
    limit: {
        type: Number,
        default: 6
    },
    show: {
        type: Boolean,
        default: true
    }
}, { _id: false });

const homeSettingsSchema = new mongoose.Schema({
    destinations: {
        type: sectionSchema,
        default: () => ({ items: [], limit: 6, show: true })
    },
    packages: {
        type: sectionSchema,
        default: () => ({ items: [], limit: 6, show: true })
    },
    services: {
        type: sectionSchema,
        default: () => ({ items: [], limit: 6, show: true })
    }
}, { timestamps: true });

const HomeSettings = mongoose.model('HomeSettings', homeSettingsSchema);

export default HomeSettings;
