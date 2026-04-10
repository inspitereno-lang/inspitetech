import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    conclusion: { type: String },
    icon: { type: String, default: 'fa-concierge-bell' },
    priority: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
