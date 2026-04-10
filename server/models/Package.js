import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    icon: { type: String, default: 'fa-suitcase' },
    description: { type: String, required: true },
    inclusions: [{ type: String }],
    conclusion: { type: String },
    price: { type: String },
    duration: { type: String },
    isEnquiryOnly: { type: Boolean, default: false },
    categoryTag: { type: String },
    priority: { type: Number, default: 0 },
    slug: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    // Backwards compatibility
    features: [{ type: String }]
}, { timestamps: true });

// Sync features with inclusions if features isn't provided and generate slug
packageSchema.pre('save', async function() {
    if ((!this.features || this.features.length === 0) && this.inclusions) {
        this.features = this.inclusions;
    }

    if (this.title && (!this.slug || this.isModified('title'))) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
