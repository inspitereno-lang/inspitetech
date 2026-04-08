import mongoose from 'mongoose';

const visaCountrySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    flag: { type: String, required: true },
    requirements: [{ type: String }],
    images: [{ type: String }],
    brief: { type: String },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, { timestamps: true });

const VisaCountry = mongoose.model('VisaCountry', visaCountrySchema);
export default VisaCountry;
