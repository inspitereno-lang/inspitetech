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
    slug: { type: String, unique: true, sparse: true },
    id: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, { timestamps: true });

// Generate slug from title
serviceSchema.pre('save', async function() {
    if (this.title && (!this.slug || this.isModified('title'))) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    
    if (this.slug) {
        this.id = this.slug;
    }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
