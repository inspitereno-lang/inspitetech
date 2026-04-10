import mongoose from 'mongoose';

const visaCountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    flag: { type: String, required: true },
    requirements: [{ type: String }],
    images: [{ type: String }],
    brief: { type: String },
    priority: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, { timestamps: true });

const VisaCountry = mongoose.model('VisaCountry', visaCountrySchema);
export default VisaCountry;
