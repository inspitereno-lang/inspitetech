import mongoose from 'mongoose';

const visaCountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    flag: { type: String, required: true },
    requirements: [{ type: String }],
    images: [{ type: String }],
    brief: { type: String },
    priority: { type: Number, default: 0 },
    id: { type: String, unique: true, sparse: true },
    slug: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, { timestamps: true });

// Sync id and slug
visaCountrySchema.pre('save', function() {
    if (this.name && (!this.id || this.isModified('name'))) {
        this.id = this.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    if (this.id && !this.slug) {
        this.slug = this.id;
    }
});

const VisaCountry = mongoose.model('VisaCountry', visaCountrySchema);
export default VisaCountry;
